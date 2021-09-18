async const saveVideos = () => {
    try {
        videoList.forEach(async (product) => {
          const newVideo= new Product(product);
          const savedVideo = await newVideo.save();
        });
      } catch (error) {
        console.error("Error while saving products to database", error.message);
    }
}



async const createUser = () => {
    try {
      const user = new User({ username: "diet", password: "diet1234" });
      const savedUser = await user.save();
    } catch (error) {
      console.error("Error while registering user", error.message);
    }
  }
  
  module.exports = { saveVideos , createUser };