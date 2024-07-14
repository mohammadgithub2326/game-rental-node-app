const User = require('../Models/User');

// Function to handle registration
exports.registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    contactNumber,
    userType
  } = req.body;
  console.log(req.body)

  // Check if all required fields are provided
  if (!username || !email || !password || !firstName || !lastName || !contactNumber || !userType) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if seller email is from admin domain
    if (userType === 'Seller' && !email.endsWith('@admin.com')) {
      return res.status(400).json({ message: 'Sellers can only register with an email address from admin domain' });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      contactNumber,
      userType
    });

    // Save user to database
    await newUser.save();

    // Respond with success message and user data
    res.status(200).json({
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      contactNumber: newUser.contactNumber,
      userType: newUser.userType
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//-------------------------------------------------------------------------------------------------
//function to get a single user using username

exports.viewUserDetails = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDetails = {
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      userType: user.userType
    };

    res.status(200).json(userDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//----------------------------------------------------------------------------------------------------------

//update user details

exports.updateUserDetails = async (req, res) => {
  const { userID, firstName, lastName, email, contactNumber, userType } = req.body;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.contactNumber = contactNumber || user.contactNumber;
    user.userType = userType || user.userType;

    await user.save();

    const updatedUserDetails = {
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      userType: user.userType
    };

    res.status(200).json(updatedUserDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//----------------------------------------------------------------------------------------------------------

//function for login

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid Login Credentials' });
    }

    res.status(200).json({ userId: user._id, message: 'Login Successful' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};