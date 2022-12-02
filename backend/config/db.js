import mongoose from "mongoose"

const connectDB = () => {
  mongoose
    .connect("mongodb+srv://anhtien27722:123123qQ@cluster0.mns2bti.mongodb.net/duan?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb được kết nối với máy chủ: ${data.connection.host}`);
    })
    .catch(() => console.log("Couldn't connect to database!"))
}

export default connectDB
