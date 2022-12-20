import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from "cors";

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
// import uploadRoutes from './routes/multer.js'
export const app = express();

dotenv.config({ path: "config/.env" });
connectDB();

app.use(express.json())
app.use(cors());

app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
// app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

app.get('/', (req, res) => {
  res.send('This is the home page')
})

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})