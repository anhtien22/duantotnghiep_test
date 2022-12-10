import mongoose from "mongoose"

const connectDB = () => {
  mongoose
    .connect("mongodb+srv://phantruyen123:odin0966176551@cluster22.2ijlbeg.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb được kết nối với máy chủ: ${data.connection.host}`);
    })
    .catch(() => console.log("Couldn't connect to database!"))
}

export default connectDB
