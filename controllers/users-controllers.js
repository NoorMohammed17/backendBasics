
const DUMMY_USERS = [
    {
      id: "1",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "secret456"
    },
    {
      id: "3",
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      password: "secure789"
    },
    {
      id: "4",
      name: "Robert Wilson",
      email: "robertwilson@example.com",
      password: "letmein123"
    },
    {
      id: "5",
      name: "Emily Brown",
      email: "emilybrown@example.com",
      password: "myp@ssword"
    }
  ]
  


const getUsers = (req,res,next) => {

    res.json({users:DUMMY_USERS})

};

const signup = (req,res,next) => {
    
};

const login = (req,res,next) => {
    
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login=login;