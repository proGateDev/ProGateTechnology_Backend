
const userModel = require("../../models/user");
const vendorModel = require("../../models/vendor");
const vendorValidationSchema = require("../validation/vendor");
const bcrypt = require("bcryptjs");

//==================================================



module.exports = {

  createVendor: async (req, res) => {
    try {
      // Validate user input
      const { error } = vendorValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const {
        name,
        mobile,
        email,
        password,
        dob,
        gender,
        address,
        bankAccountDetails,
        UPIid,
        referralCode,
        agreementCheck,
        business,
        role,
      } = req.body;

      // Check for duplicate mobile or email
      const existingUser = await vendorModel.findOne({
        $or: [{ email }, { mobile }],
      });
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          error: "Vendor with this email or mobile number already exists",
        });
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Generate a unique referral code (if not provided)
      const generatedReferralCode = referralCode || `REF-${Date.now()}`;

      // Create new user
      const newUser = new vendorModel({
        name,
        mobile,
        email,
        password: passwordHash,
        dob,
        gender,
        address,
        bankAccountDetails,
        UPIid,
        referralCode: generatedReferralCode,
        agreementCheck,
        business,
        role,
      });

      await newUser.save();

      res.status(201).json({
        message: "Vendor created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          mobile: newUser.mobile,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error("❌ Error creating Vendor:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  getAllVendors: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;

      const filter = {
        isDeleted: false, // Exclude soft-deleted users
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } },
        ],
      };

      // Pagination calculation
      const skip = (page - 1) * limit;

      // Fetch users with pagination and populate role and business
      const vendors = await vendorModel
        .find(filter)
        .populate("role", "name permissions") // Populate role info
        // .populate("business", "name type") // Populate business info
        .select(["-passwordHash", "-bankAccountDetails", "-password", "-dob", "-referralCode"]) // Exclude Fields
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }); // Latest first

      const totalUsers = await vendorModel.countDocuments(filter);

      res.status(200).json({
        message: "Vendors fetched successfully",
        page: Number(page),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        vendors,
      });
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET: Fetch a specific user by ID
  getUserById: async (req, res) => {
    try {
      const { businessAdminId } = req.params;

      const user = await userModel
        .findById(businessAdminId)
        .populate("role", "name permissions")
        .populate("business", "name type")
        .select("-passwordHash"); // Exclude passwordHash

      if (!user || user.isDeleted) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      console.error("❌ Error fetching user by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },




};
