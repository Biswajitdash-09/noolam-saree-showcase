# Owner guide

This guide is for whoever runs the shop. Every change below is an edit to a
text file, followed by a redeploy (see the last section). You don't need to
know React.

## 1. Put in your shop's details

Open `lib/shop.ts`. This one file feeds the footer, the care page, every
WhatsApp message, the enquiry emails and your Google listing.

| Field | What to put | Example |
| --- | --- | --- |
| `whatsapp` | Your WhatsApp number, country code first, digits only | `919840012345` |
| `phone` | The number customers should call, written how you like | `+91 98400 12345` |
| `email` | Where customers can write to you | `shop@yourname.in` |
| `address` | Street, city, state, PIN code | |
| `mapsUrl` | In Google Maps, open your shop, choose **Share**, then **Copy link** | |
| `hours` | Opening and closing time for each day, 24-hour clock, Indian time. `0` is Sunday. Put `null` for a day you're closed | `{ open: "10:00", close: "20:00" }` |
| `hoursNote` | The hours in plain words, shown under the open/closed line | `Open daily, 10 am – 8 pm` |
| `shipping`, `returns` | Your delivery times and returns policy | |
| `replyPromise` | How quickly you reply to enquiries | `within one working day` |

The care page works out "Open now" or "Closed now" from `hours`, using Indian
time even for customers abroad.

> The details in the file now are placeholders. Replace all of them before the
> site goes live, especially the WhatsApp number: orders are sent there.

## 2. Add a saree, change a price, mark it sold out

Open `lib/data.ts` and find the `products` list. Each saree looks like this:

```ts
{
  id: "s5",
  slug: "bengal-garden",          // the web address: /product/bengal-garden
  name: "Bengal Garden",
  price: 24600,                   // rupees, no commas
  compareAt: 28000,               // optional: the old price, shown struck through
  stock: 2,                       // optional: see below
  ...
}
```

**Stock.** Leave `stock` out if you don't want to track it. Otherwise:

- `stock: 0` shows **Sold out**. "Add to bag" becomes **Ask for a re-weave**,
  which opens WhatsApp.
- `stock: 1` or `2` shows **Only 1 left** or **Only 2 left**.
- `madeToOrder: true` shows **Made to order**, with the lead time from
  `shipping.madeToOrderWeeks` in `lib/shop.ts`.

**Adding a saree.** Copy an existing entry, give it a new `id` and `slug`, and
change the details. Its product page, its place on the rack and its place in the
shop filters appear automatically.

## 3. How orders reach you

Customers can't pay on the site. Instead:

1. They add pieces to the bag and tap **Order on WhatsApp**.
2. WhatsApp opens with a message to your number. It lists each piece, its size,
   quantity and price, the subtotal, and asks for their PIN code.
3. You check stock, confirm delivery, and send a payment link (UPI, Razorpay
   link or bank transfer), the same way you sell on WhatsApp today.

Customers can also choose **Email this order instead**, which sends the same
list to your email (see section 4).

The bag stays in the customer's browser, so they can close the site and come
back to it later.

## 4. Turn on email enquiries

These buttons send a form: the care page's **Write to the loom room** form,
**See it on a video call**, **Book a fitting** and **Email this order**.

**Until email is set up**, a customer who sends a form sees a **Send on
WhatsApp** button with their message already written. No enquiry is lost.

To have the forms email you:

1. Create a free account at [resend.com](https://resend.com).
2. In Resend, add and verify your shop's domain (for example `yourname.in`).
   Resend shows the DNS records to add with your domain provider.
3. Create an API key in Resend.
4. In your hosting settings (Vercel: **Project → Settings → Environment
   Variables**), add:

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | the key from step 3 |
   | `ENQUIRY_FROM_EMAIL` | `NOOLAM Website <enquiries@yourname.in>` (must use the verified domain) |
   | `ENQUIRY_TO_EMAIL` | the inbox that should receive enquiries |
   | `NEXT_PUBLIC_SITE_URL` | your site address, e.g. `https://www.yourname.in` |

5. Redeploy.

Each email's subject says what it is and who sent it, for example *Video call
request — Kanchi Rani — Priya, 98400 12345*. Replying to the email replies to
the customer, if they gave an email address.

The forms have built-in protection against spam bots, and they check the
customer's name and mobile number before sending.

## 5. Show up on Google

The site already tells Google your shop's name, address, hours and phone, and
each saree's price and stock. Set `NEXT_PUBLIC_SITE_URL` (section 4) so these
links point at your real address.

Then:

- Create or claim your shop on
  [Google Business Profile](https://business.google.com). Use the same name,
  address and phone as in `lib/shop.ts`.
- Add the site in [Google Search Console](https://search.google.com/search-console)
  and submit `https://your-site/sitemap.xml`.

## 6. Customer reviews

The site has no reviews section on purpose: reviews must come from real
customers. Once you have some, collect them on your Google Business Profile.
When you want them on the site, ask your developer to add a reviews section
that shows those real reviews with the customers' permission.

## 7. Publish your changes

The simplest host is [Vercel](https://vercel.com):

1. Put this project in a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Add the environment variables from section 4.
4. Choose **Deploy**.

From then on, every change pushed to GitHub publishes automatically in about a
minute.

## Before you go live

- [ ] Real WhatsApp number, phone, email and address in `lib/shop.ts`
- [ ] Real prices and stock in `lib/data.ts`
- [ ] Real photos of your sarees (see `docs/IMAGES.md`)
- [ ] `NEXT_PUBLIC_SITE_URL` set to your address
- [ ] Email turned on (optional), with one test enquiry sent to yourself
- [ ] Remove the "Showcase demo" line from the footer
      (`components/site/site-footer.tsx`)
