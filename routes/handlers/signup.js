const page = (req, res) => {

console.log(req.body)
  res.render("pages/signup", {
      title: 'Signup',
  });
};

const formSubmit = (req, res) => {
  console.log(req.body)
  res.send(req.body)
};

module.exports = {
  page,
  formSubmit
};

