const jwt = require("jsonwebtoken");
const userModel = require("../models/user"); // Regular Users
const vendorModel = require("../models/vendor"); // Regular Users
const adminModel = require("../models/admin"); // Admin Users
const Role = require("../models/role"); // Role Model
const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Middleware to authenticate & enforce Role-Based Access Control (RBAC)
 * @param {Array} requiredPermissions - Permissions needed to access this route
 */
const checkPermissions = (requiredPermissions = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: 401,
        response: "Missing User Token in headers"

      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      // Fetch user from either admin or user collection
      // console.log('user', decoded.userId);
      let user = await adminModel.findById(decoded.userId).populate("role");
      let isAdmin = true;
      // console.log('user', user);

      if (!user) {
        user = await vendorModel.findById(decoded.userId).populate("role");
        isAdmin = false;
      }

      if (!user || user.isDeleted) {
        return res.status(403).json({
          status: 403,
          response: "User no longer exists or is inactive"
        });
      }

      // Extract user role permissions
      const userPermissions = user.role?.permissions || [];

      // Permission Check: Ensure user has all required permissions
      if (requiredPermissions.length > 0) {
        const hasPermission = requiredPermissions.every((perm) =>
          userPermissions.includes(perm)
        );

        if (!hasPermission) {
          return res.status(403).json({
            status: 403,
            message: "Access Denied: Insufficient permissions",
          });
        }
      }

      // Attach user context to the request
      req.user = user;
      req.tokenData = decoded;
      req.isAdmin = isAdmin;

      next();
    } catch (error) {
      console.error("Error in checkPermissions middleware:", error);

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ response: "Invalid token" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ status: 401, response: "Token expired" });
      }

      return res.status(500).json({ response: "Internal Server Error" });
    }
  };
};

module.exports = checkPermissions;
