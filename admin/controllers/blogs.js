const blogModel = require('../../models/blogs');
const slugify = require('slugify');

//=======================================================
module.exports = {

  createBlog: async (req, res) => {
    try {
      const {
        title,
        content,
        tags,
        seo,
        coverImageUrl,
        isPublished,
      } = req.body;

      const slug = slugify(title, { lower: true });

      const newBlog = await blogModel.create({
        title,
        slug,
        content,
        tags,
        seo,
        coverImageUrl,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
        createdBy: req.user?._id || null,
      });

      return res.status(201).json({ message: 'Blog created', blog: newBlog });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating blog' });
    }
  },


  getAllBlogs: async (req, res) => {
    try {
      const { search = '', page = 1, limit = 10, tag } = req.query;

      const query = {
        ...(search && {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { 'seo.title': { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } }
          ]
        }),
        ...(tag && { tags: tag })
      };

      const blogs = await blogModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .select('-__v') // Optional: remove __v field
        .populate('createdBy', 'name email') // Optional: author info
        .lean();

      const total = await blogModel.countDocuments(query);

      res.status(200).json({
        data: blogs,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getBlogBySlug: async (req, res) => {
    try {

      const { blogId } = req.params;

      console.log(' req.params', blogId);
      const blog = await blogModel.findOne({ _id: blogId })
        .populate('createdBy', 'name email') // optional: populate author details
        .lean();

      if (!blog) {
        return res.status(200).json({ status: 200, message: 'Blog not found' });
      }

      res.status(200).json({
        status: 200,
        message: 'Blog fetched successfully',
        data: blog,
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
