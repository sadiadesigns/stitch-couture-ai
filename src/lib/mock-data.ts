import tailor1 from "@/assets/tailor-1.jpg";
import tailor2 from "@/assets/tailor-2.jpg";
import tailor3 from "@/assets/tailor-3.jpg";
import catShirts from "@/assets/cat-shirts.jpg";
import catDresses from "@/assets/cat-dresses.jpg";
import catPanjabi from "@/assets/cat-panjabi.jpg";
import catBlazer from "@/assets/cat-blazer.jpg";
import catLehenga from "@/assets/cat-lehenga.jpg";
import design1 from "@/assets/design-1.jpg";
import fabric from "@/assets/fabric-swatches.jpg";
import hands from "@/assets/tailor-hands.jpg";

export const categories = [
  { name: "Shirts", image: catShirts, count: 128 },
  { name: "Dresses", image: catDresses, count: 96 },
  { name: "Panjabi", image: catPanjabi, count: 74 },
  { name: "Blazer", image: catBlazer, count: 52 },
  { name: "Lehenga", image: catLehenga, count: 38 },
  { name: "Saree Blouse", image: catDresses, count: 61 },
];

export const tailors = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    photo: tailor1,
    specialty: "Menswear & Panjabi",
    rating: 4.9,
    reviews: 412,
    experience: 14,
    orders: 1240,
    price: 49,
    verified: true,
    location: "Downtown • 2.1 km",
    portfolio: [design1, catBlazer, catPanjabi, catShirts],
  },
  {
    id: "amelia-shah",
    name: "Amelia Shah",
    photo: tailor2,
    specialty: "Bridal & Couture",
    rating: 4.95,
    reviews: 289,
    experience: 11,
    orders: 860,
    price: 89,
    verified: true,
    location: "Bandra West • 3.4 km",
    portfolio: [catLehenga, catDresses, design1, catPanjabi],
  },
  {
    id: "leo-fernandez",
    name: "Leo Fernandez",
    photo: tailor3,
    specialty: "Modern Suits",
    rating: 4.8,
    reviews: 156,
    experience: 7,
    orders: 512,
    price: 69,
    verified: true,
    location: "Powai • 5.0 km",
    portfolio: [catBlazer, catShirts, design1, catDresses],
  },
];

export const trending = [
  { title: "Magenta Silk Suit", image: design1, tag: "Trending" },
  { title: "Ivory Kurta Set", image: catPanjabi, tag: "New" },
  { title: "Rose Slip Dress", image: catDresses, tag: "Editor's pick" },
];

export const orderStages = [
  "Order Confirmed",
  "Assistant Assigned",
  "Measurements Completed",
  "Fabric Collected",
  "Tailoring",
  "Quality Inspection",
  "Ready for Delivery",
  "Delivered",
];

export const heroImages = { design1, fabric, hands };
