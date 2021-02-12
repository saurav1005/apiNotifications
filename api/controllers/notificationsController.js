exports.sendEmail = async (req, res, next) => {
  try {
    res.status(200).json({ status: 200, message: 'Mail Sent Sucessully' });
  } catch (err) {
    console.log(err);
  }
};
