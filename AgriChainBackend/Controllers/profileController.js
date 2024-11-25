const Profile = require("../models/profile"); // Ensure the model is imported correctly

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

const getUserProfile = async (req, res) => {
  try {
    // Use 'Profile' here, not 'profile'
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["fullname", "email", "contact", "address"]
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// const updateUserProfile = async (req, res) => {
//   try {
//     const { bio } = req.body;
//     let updateData = { bio };

//     if (req.file) {
//       const profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
//       updateData.profileImage = profileImage;
//     }

//     // Again, use 'Profile' instead of 'profile'
//     const profile = await Profile.findOneAndUpdate(
//       { user: req.user.id },
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!profile) {
//       return res.status(404).json({ msg: "Profile not found" });
//     }

//     res.status(200).json({ profile });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

const updateUserProfile = async (req, res) => {
  try {
    // Log the request body and user ID to check if data is coming through
    console.log("Request body:", req.body);
    console.log("User ID:", req.user.id);

    const { bio } = req.body;
    let updateData = { bio };

    // Check if a file was uploaded
    if (req.file) {
      const domain = process.env.DOMAIN || "http://localhost:5000"; // Ensure 'domain' is defined
      const profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
      updateData.profileImage = profileImage;
      console.log("Profile image URL:", profileImage); // Log the image URL
    }

    // Log the updateData before executing the update
    console.log("Update data:", updateData);

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    sendErrorResponse(res, error);
  }
};

module.exports = { getUserProfile, updateUserProfile };
