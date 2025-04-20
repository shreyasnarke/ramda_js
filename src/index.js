const axios = require("axios");
const R = require("ramda");

const link = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = async () => {
  try {
    const result = await axios.get(link);
    const users = result.data;
    const names = R.pluck('name', users);//Get all names
    console.log("User Names:", names);

    const companyName = R.path(['company','name'],users[0]);
    console.log("First users company name:",companyName);

    const zipcode= R.pathOr('00000', ['address', 'zipcode'], users[1]);
    console.log("Zipcode of second user :", zipcode);

    const emails= R.map(R.prop('email'),users);
    console.log("All Emails:",emails);

    const sortedbyName = R.sortBy(R.prop('name'),users);
    console.log("Sorted by name:",R.pluck('name',sortedbyName));

    const cities = R.map(R.path(['address', 'city']), users);
    const unqCities = R.uniq(cities);
    console.log("Unique cities:", unqCities);

    const groupbyCity = R.groupBy(user => R.path(['address', 'city'], user), users);
    console.log("Grouped by City:", Object.keys(groupbyCity));

    const cntLetters = R.reduce((temp, name)=>temp+ name.length,0,names);
    console.log("Total letters in all usernames:", cntLetters);
    
    const mergeNameEmail = R.map(R.converge(R.mergeRight, [
        R.pick(['name']),
        R.pick(['email'])
      ]), users);
      console.log("Name and Email Joined:", mergeNameEmail[0]);

    const delSmallids = R.dropWhile(user => user.id < 5, users);
    console.log("Users with ID greater 5:", delSmallids.map(u => u.id));

    const Cities = R.map(R.path(['address', 'city']), users);
    const specCity = R.includes('Lebsackbury', Cities);
    console.log("Lebsackbury Present or not : ", specCity);

  } catch (error) {
    console.error("Error", error.message);
  }
};
fetchUsers();
