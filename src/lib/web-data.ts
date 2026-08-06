import { tailors } from "./mock-data";
import design1 from "@/assets/design-1.jpg";
import fabric from "@/assets/fabric-swatches.jpg";
import catBlazer from "@/assets/cat-blazer.jpg";
import catPanjabi from "@/assets/cat-panjabi.jpg";
import catDresses from "@/assets/cat-dresses.jpg";

export const workflow = [
  "New Order",
  "Accepted",
  "Measurement Completed",
  "Tailoring Started",
  "Quality Check",
  "Ready for Delivery",
  "Delivered",
] as const;

export type Stage = (typeof workflow)[number];

export type Order = {
  id: string;
  customer: string;
  customerId: string;
  item: string;
  category: string;
  stage: Stage;
  amount: number;
  placed: string;
  due: string;
  tailor: string;
  fabric: string;
  preview: string;
  notes: string;
  measurements: { label: string; value: string }[];
  design: { label: string; value: string }[];
};

const measurements = [
  { label: "Chest", value: "40 in" },
  { label: "Waist", value: "34 in" },
  { label: "Hip", value: "39 in" },
  { label: "Shoulder", value: "18 in" },
  { label: "Sleeve", value: "24.5 in" },
  { label: "Length", value: "29 in" },
];

const design = [
  { label: "Neckline", value: "Mandarin collar" },
  { label: "Sleeve Type", value: "Set-in" },
  { label: "Sleeve Length", value: "Full" },
  { label: "Dress / Shirt Length", value: "Regular" },
  { label: "Fit Style", value: "Slim tailored" },
  { label: "Additional Instructions", value: "Add inner pocket, keep hem soft" },
];

export const orders: Order[] = [
  {
    id: "STC-2418", customer: "Alex Carter", customerId: "alex-carter", item: "Magenta silk suit", category: "Blazer",
    stage: "Tailoring Started", amount: 420, placed: "Oct 18, 2026", due: "Nov 3, 2026", tailor: "Arjun Mehta",
    fabric, preview: design1, notes: "Wedding in early November — please prioritise.", measurements, design,
  },
  {
    id: "STC-2415", customer: "Kabir Rao", customerId: "kabir-rao", item: "Cream kurta set", category: "Panjabi",
    stage: "Quality Check", amount: 260, placed: "Oct 12, 2026", due: "Oct 30, 2026", tailor: "Arjun Mehta",
    fabric: catPanjabi, preview: catPanjabi, notes: "Slightly loose around the waist.", measurements, design,
  },
  {
    id: "STC-2409", customer: "Priya Menon", customerId: "priya-menon", item: "Navy blazer", category: "Blazer",
    stage: "New Order", amount: 380, placed: "Oct 22, 2026", due: "Nov 8, 2026", tailor: "Unassigned",
    fabric: catBlazer, preview: catBlazer, notes: "Prefers structured shoulder.", measurements, design,
  },
  {
    id: "STC-2402", customer: "Sara Iqbal", customerId: "sara-iqbal", item: "Rose slip dress", category: "Dresses",
    stage: "Ready for Delivery", amount: 310, placed: "Oct 4, 2026", due: "Oct 26, 2026", tailor: "Amelia Shah",
    fabric: catDresses, preview: catDresses, notes: "Deliver to office address after 5pm.", measurements, design,
  },
  {
    id: "STC-2396", customer: "Dev Sharma", customerId: "dev-sharma", item: "Charcoal three-piece", category: "Blazer",
    stage: "Delivered", amount: 640, placed: "Sep 28, 2026", due: "Oct 18, 2026", tailor: "Leo Fernandez",
    fabric: catBlazer, preview: design1, notes: "Repeat customer.", measurements, design,
  },
  {
    id: "STC-2390", customer: "Nadia Hasan", customerId: "nadia-hasan", item: "Bridal lehenga", category: "Lehenga",
    stage: "Measurement Completed", amount: 1250, placed: "Oct 20, 2026", due: "Dec 2, 2026", tailor: "Amelia Shah",
    fabric, preview: catDresses, notes: "Hand embroidery on the border.", measurements, design,
  },
  {
    id: "STC-2384", customer: "Ravi Kulkarni", customerId: "ravi-kulkarni", item: "Linen shirt x3", category: "Shirts",
    stage: "Accepted", amount: 190, placed: "Oct 21, 2026", due: "Nov 1, 2026", tailor: "Arjun Mehta",
    fabric, preview: design1, notes: "Same fit as last order.", measurements, design,
  },
];

export type Appointment = {
  id: string; customer: string; address: string; date: string; time: string;
  assistant: string; status: "Scheduled" | "Completed" | "Rescheduled" | "Cancelled";
};

export const appointments: Appointment[] = [
  { id: "APT-114", customer: "Alex Carter", address: "42 Marine Drive, Apt 8B", date: "2026-08-10", time: "10:00 AM", assistant: "Neha Verma", status: "Scheduled" },
  { id: "APT-115", customer: "Priya Menon", address: "12 Hill Road, Bandra West", date: "2026-08-10", time: "1:30 PM", assistant: "Imran Khan", status: "Scheduled" },
  { id: "APT-116", customer: "Kabir Rao", address: "77 Powai Lake View", date: "2026-08-12", time: "11:15 AM", assistant: "Neha Verma", status: "Rescheduled" },
  { id: "APT-117", customer: "Sara Iqbal", address: "5 Juhu Tara Road", date: "2026-08-14", time: "4:00 PM", assistant: "Imran Khan", status: "Scheduled" },
  { id: "APT-118", customer: "Dev Sharma", address: "220 Andheri East", date: "2026-08-06", time: "9:00 AM", assistant: "Ritu Das", status: "Completed" },
  { id: "APT-119", customer: "Nadia Hasan", address: "31 Colaba Causeway", date: "2026-08-19", time: "2:45 PM", assistant: "Ritu Das", status: "Scheduled" },
];

export type Customer = {
  id: string; name: string; email: string; phone: string; city: string;
  joined: string; ordersCount: number; spend: number; status: "Active" | "Suspended";
};

export const customers: Customer[] = [
  { id: "alex-carter", name: "Alex Carter", email: "alex@stitch.app", phone: "+91 98200 11223", city: "Mumbai", joined: "Mar 2025", ordersCount: 7, spend: 2140, status: "Active" },
  { id: "kabir-rao", name: "Kabir Rao", email: "kabir@stitch.app", phone: "+91 98200 44556", city: "Mumbai", joined: "Jul 2025", ordersCount: 3, spend: 780, status: "Active" },
  { id: "priya-menon", name: "Priya Menon", email: "priya@stitch.app", phone: "+91 98200 77889", city: "Pune", joined: "Jan 2026", ordersCount: 2, spend: 690, status: "Active" },
  { id: "sara-iqbal", name: "Sara Iqbal", email: "sara@stitch.app", phone: "+91 98200 33445", city: "Mumbai", joined: "Nov 2025", ordersCount: 5, spend: 1520, status: "Active" },
  { id: "dev-sharma", name: "Dev Sharma", email: "dev@stitch.app", phone: "+91 98200 66778", city: "Delhi", joined: "Feb 2025", ordersCount: 9, spend: 3410, status: "Suspended" },
  { id: "nadia-hasan", name: "Nadia Hasan", email: "nadia@stitch.app", phone: "+91 98200 99001", city: "Dhaka", joined: "Jun 2026", ordersCount: 1, spend: 1250, status: "Active" },
  { id: "ravi-kulkarni", name: "Ravi Kulkarni", email: "ravi@stitch.app", phone: "+91 98200 22334", city: "Pune", joined: "Sep 2025", ordersCount: 4, spend: 860, status: "Active" },
];

export const reviews = [
  { id: 1, customer: "Priya M.", rating: 5, date: "Aug 2, 2026", order: "STC-2409", text: "Perfect fit, delivered on time. Would recommend to anyone." },
  { id: 2, customer: "Dev S.", rating: 5, date: "Jul 28, 2026", order: "STC-2396", text: "The three-piece is immaculate. Attention to detail is unreal." },
  { id: 3, customer: "Sara I.", rating: 4, date: "Jul 21, 2026", order: "STC-2402", text: "Lovely dress, though delivery slipped by a day." },
  { id: 4, customer: "Kabir R.", rating: 5, date: "Jul 14, 2026", order: "STC-2415", text: "Second order with Arjun — consistently excellent." },
  { id: 5, customer: "Alex C.", rating: 3, date: "Jul 2, 2026", order: "STC-2380", text: "Good work overall but the sleeves needed one more alteration." },
];

export const revenueSeries = [
  { month: "Feb", revenue: 18200, orders: 96, customers: 210 },
  { month: "Mar", revenue: 21400, orders: 112, customers: 268 },
  { month: "Apr", revenue: 24950, orders: 130, customers: 331 },
  { month: "May", revenue: 23100, orders: 121, customers: 388 },
  { month: "Jun", revenue: 28800, orders: 149, customers: 470 },
  { month: "Jul", revenue: 33450, orders: 168, customers: 559 },
  { month: "Aug", revenue: 38900, orders: 187, customers: 662 },
];

export const categoryShare = [
  { name: "Blazer", value: 32 },
  { name: "Panjabi", value: 24 },
  { name: "Dresses", value: 21 },
  { name: "Shirts", value: 14 },
  { name: "Lehenga", value: 9 },
];

export const payouts = [
  { id: "TXN-9021", party: "Arjun Mehta", type: "Tailor payout", amount: 4280, date: "Aug 1, 2026", status: "Completed" },
  { id: "TXN-9019", party: "Amelia Shah", type: "Tailor payout", amount: 6120, date: "Aug 1, 2026", status: "Completed" },
  { id: "TXN-9018", party: "Alex Carter", type: "Order payment", amount: 420, date: "Jul 31, 2026", status: "Completed" },
  { id: "TXN-9015", party: "Leo Fernandez", type: "Tailor payout", amount: 2960, date: "Jul 30, 2026", status: "Pending" },
  { id: "TXN-9011", party: "Nadia Hasan", type: "Order payment", amount: 1250, date: "Jul 29, 2026", status: "Pending" },
  { id: "TXN-9004", party: "Sara Iqbal", type: "Refund", amount: -180, date: "Jul 26, 2026", status: "Completed" },
];

export const complaints = [
  { id: "TCK-341", subject: "Order delivered late", customer: "Sara Iqbal", tailor: "Amelia Shah", priority: "High", status: "Open", opened: "Aug 4, 2026" },
  { id: "TCK-338", subject: "Fabric colour mismatch", customer: "Kabir Rao", tailor: "Arjun Mehta", priority: "Medium", status: "In review", opened: "Aug 2, 2026" },
  { id: "TCK-330", subject: "Assistant did not arrive", customer: "Priya Menon", tailor: "—", priority: "High", status: "Resolved", opened: "Jul 28, 2026" },
  { id: "TCK-324", subject: "Refund not received", customer: "Dev Sharma", tailor: "Leo Fernandez", priority: "Low", status: "Resolved", opened: "Jul 22, 2026" },
];

export const applications = tailors.map((t, i) => ({
  id: t.id,
  name: t.name,
  photo: t.photo,
  specialty: t.specialty,
  experience: t.experience,
  submitted: ["Aug 3, 2026", "Aug 1, 2026", "Jul 30, 2026"][i],
  nationalId: ["IND-4482-1190", "IND-2210-7734", "IND-9087-4412"][i],
  certificates: ["NIFT Diploma", "Couture Level 3", "Bespoke Tailoring Cert."][i],
  status: (["Pending", "Pending", "More info requested"] as const)[i],
  portfolio: t.portfolio,
}));

export const assistants = [
  { name: "Neha Verma", zone: "South Mumbai", today: 4, week: 18, rating: 4.9 },
  { name: "Imran Khan", zone: "Western Suburbs", today: 3, week: 15, rating: 4.7 },
  { name: "Ritu Das", zone: "Central & East", today: 2, week: 12, rating: 4.8 },
];
