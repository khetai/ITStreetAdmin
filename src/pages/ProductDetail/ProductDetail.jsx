import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../layouts/Navbar/Navbar";
import style from "./index.module.scss";
import Footer from "../../layouts/Footer/Footer";
import TopSlickSlider from "../../components/TopSlickSlider";

function ProductDetail() {
  let { id } = useParams();
  const [datum, setDatum] = useState(null);
  useEffect(() => {
    const data = [
      {
        id: 1,
        product_name: "Laptop Computer",
        price: 799.99,
        img_url:
          "https://images.pexels.com/photos/18096279/pexels-photo-18096279/free-photo-of-laptop-standing-on-a-wooden-table-at-a-terrace.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>ExampleTech</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td>Intel Core i5</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>8 GB</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>256 GB SSD</td>
            </tr>
            <tr>
              <td>Screen Size</td>
              <td>15.6 inches</td>
            </tr>
          </table>
        `,
      },
      {
        id: 2,
        product_name: "Hiking Backpack",
        price: 69.99,
        img_url:
          "https://images.pexels.com/photos/18047302/pexels-photo-18047302/free-photo-of-man-in-hat-and-backpack-hiking-in-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>OutdoorX</td>
            </tr>
            <tr>
              <td>Capacity</td>
              <td>40 Liters</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Green/Black</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>Nylon</td>
            </tr>
            <tr>
              <td>Features</td>
              <td>Waterproof, Multiple Pockets</td>
            </tr>
          </table>
        `,
      },
      {
        id: 3,
        product_name: "Dining Table Set",
        price: 499.0,
        img_url:
          "https://images.pexels.com/photos/5638639/pexels-photo-5638639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Material</td>
              <td>Wood</td>
            </tr>
            <tr>
              <td>Table Dimensions</td>
              <td>72" x 36" x 30"</td>
            </tr>
            <tr>
              <td>Chair Material</td>
              <td>Fabric</td>
            </tr>
            <tr>
              <td>Seating Capacity</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Walnut</td>
            </tr>
          </table>
        `,
      },
      {
        id: 5,
        product_name: "Desk Organizer",
        price: 12.99,
        img_url:
          "https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Type</td>
              <td>Desktop Organizer</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Clear</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>Acrylic</td>
            </tr>
            <tr>
              <td>Compartments</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Dimensions</td>
              <td>10" x 5" x 3"</td>
            </tr>
          </table>
        `,
      },
      {
        id: 4,
        product_name: "Running Shorts",
        price: 24.5,
        img_url:
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>SportyFit</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Black</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>Polyester</td>
            </tr>
            <tr>
              <td>Fit</td>
              <td>Regular</td>
            </tr>
          </table>
        `,
      },
      {
        id: 11,
        product_name: "Smartphone",
        price: 499.99,
        img_url:
          "https://images.pexels.com/photos/50614/pexels-photo-50614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>ExampleBrand</td>
            </tr>
            <tr>
              <td>Model</td>
              <td>Smartphone XYZ</td>
            </tr>
            <tr>
              <td>Screen Size</td>
              <td>6.2 inches</td>
            </tr>
            <tr>
              <td>Camera</td>
              <td>12 MP Dual Camera</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>128 GB</td>
            </tr>
          </table>
        `,
      },
      {
        id: 21,
        product_name: "Running Shoes",
        price: 89.99,
        img_url:
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>ExampleSport</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>Running Shoes</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>US 9</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Black/Red</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>Men</td>
            </tr>
          </table>
        `,
      },
      {
        id: 31,
        product_name: "Coffee Table",
        price: 199.0,
        img_url:
          "https://images.pexels.com/photos/378006/pexels-photo-378006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Material</td>
              <td>Wood</td>
            </tr>
            <tr>
              <td>Dimensions</td>
              <td>48" x 24" x 18"</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Espresso</td>
            </tr>
            <tr>
              <td>Assembly Required</td>
              <td>Yes</td>
            </tr>
          </table>
        `,
      },
      {
        id: 41,
        product_name: "Dress Shirt",
        price: 39.5,
        img_url:
          "https://images.pexels.com/photos/9178850/pexels-photo-9178850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>ExampleFashion</td>
            </tr>
            <tr>
              <td>Style</td>
              <td>Classic Fit</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>White</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>Cotton</td>
            </tr>
          </table>
        `,
      },
      {
        id: 51,
        product_name: "LED Desk Lamp",
        price: 24.99,
        img_url:
          "https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Type</td>
              <td>LED Desk Lamp</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Silver</td>
            </tr>
            <tr>
              <td>Adjustable</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Power Source</td>
              <td>Plug-in</td>
            </tr>
          </table>
        `,
      },
      {
        id: 12,
        product_name: "Klaviatura",
        price: 45.99,
        img_url:
          "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: `
        <table>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Width</td>
          <td>300mm</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>40mm</td>
        </tr>
        <tr>
          <td>Key Switch Type</td>
          <td>Mechanical</td>
        </tr>
        <tr>
          <td>Number of Keys</td>
          <td>104</td>
        </tr>
        <tr>
          <td>Backlighting</td>
          <td>RGB</td>
        </tr>
        <tr>
          <td>Wireless</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Interface</td>
          <td>USB</td>
        </tr>
      </table>
      
  `,
      },
      {
        id: 22,
        product_name: "Monitor",
        price: 249.99,
        img_url:
          "https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
        <table>
    <tr>
      <th>Attribute</th>
      <th>Value</th>
    </tr>
    <tr>
      <td>Screen Size</td>
      <td>27 inches</td>
    </tr>
    <tr>
      <td>Resolution</td>
      <td>2560 x 1440 pixels (QHD)</td>
    </tr>
    <tr>
      <td>Panel Type</td>
      <td>IPS</td>
    </tr>
    <tr>
      <td>Refresh Rate</td>
      <td>144Hz</td>
    </tr>
    <tr>
      <td>Response Time</td>
      <td>4ms</td>
    </tr>
    <tr>
      <td>Connectivity</td>
      <td>HDMI, DisplayPort, USB-C</td>
    </tr>
    <tr>
      <td>Adaptive Sync</td>
      <td>FreeSync</td>
    </tr>
  </table>
  `,
      },
      {
        id: 32,
        product_name: "Fayl serveri",
        price: 899.0,
        img_url:
          "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
        <table>
    <tr>
      <th>Attribute</th>
      <th>Value</th>
    </tr>
    <tr>
      <td>Model</td>
      <td>XYZ-123 Server</td>
    </tr>
    <tr>
      <td>Processor</td>
      <td>Intel Xeon Gold 6254 (Dual CPU)</td>
    </tr>
    <tr>
      <td>Memory</td>
      <td>128 GB DDR4 ECC RAM</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td>4x 2TB SSD (RAID 10)</td>
    </tr>
    <tr>
      <td>Network Interface</td>
      <td>Dual 10 Gigabit Ethernet</td>
    </tr>
    <tr>
      <td>Operating System</td>
      <td>Linux CentOS 7</td>
    </tr>
    <tr>
      <td>Remote Management</td>
      <td>iDRAC (Integrated Dell Remote Access Controller)</td>
    </tr>
  </table>
  
        `,
      },
      {
        id: 42,
        product_name: "WiFi Ruter",
        price: 34.5,
        img_url:
          "https://images.pexels.com/photos/4218546/pexels-photo-4218546.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: `
        <table>
    <tr>
      <th>Attribute</th>
      <th>Value</th>
    </tr>
    <tr>
      <td>Model</td>
      <td>ACME-123 Wireless Router</td>
    </tr>
    <tr>
      <td>Wireless Standards</td>
      <td>802.11ac, 802.11n, 802.11g</td>
    </tr>
    <tr>
      <td>Frequency Bands</td>
      <td>2.4 GHz, 5 GHz</td>
    </tr>
    <tr>
      <td>Maximum Data Rate</td>
      <td>Up to 1200 Mbps</td>
    </tr>
    <tr>
      <td>Security</td>
      <td>WPA3, WPA2, WEP, Firewall</td>
    </tr>
    <tr>
      <td>Number of Antennas</td>
      <td>4 external antennas</td>
    </tr>
    <tr>
      <td>Ports</td>
      <td>4 LAN ports, 1 WAN port, USB port</td>
    </tr>
    <tr>
      <td>Guest Network</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Parental Controls</td>
      <td>Yes</td>
    </tr>
  </table>
  `,
      },
      {
        id: 52,
        product_name: "USB Flash Sürücü",
        price: 12.75,
        img_url:
          "https://images.pexels.com/photos/6200/wood-pen-usb-vintage.jpg?auto=compress&cs=tinysrgb&w=600",
        description: `
        <table>
    <tr>
      <th>Attribute</th>
      <th>Value</th>
    </tr>
    <tr>
      <td>Capacity</td>
      <td>32 GB</td>
    </tr>
    <tr>
      <td>Interface</td>
      <td>USB 3.0</td>
    </tr>
    <tr>
      <td>Form Factor</td>
      <td>Swivel</td>
    </tr>
    <tr>
      <td>Read Speed</td>
      <td>Up to 100 MB/s</td>
    </tr>
    <tr>
      <td>Write Speed</td>
      <td>Up to 30 MB/s</td>
    </tr>
    <tr>
      <td>Operating System Compatibility</td>
      <td>Windows, macOS, Linux</td>
    </tr>
    <tr>
      <td>Encryption</td>
      <td>Hardware Encryption Supported</td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>2.3 x 0.7 x 0.4 inches (L x W x H)</td>
    </tr>
    <tr>
      <td>Color</td>
      <td>Black</td>
    </tr>
  </table>
  
        `,
      },
      {
        id: 14,
        product_name: "Gaming Laptop",
        price: 1499.99,
        img_url:
          "https://images.pexels.com/photos/16230031/pexels-photo-16230031/free-photo-of-laptop-and-monitor-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>ExampleGamer</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td>Intel Core i7</td>
            </tr>
            <tr>
              <td>GPU</td>
              <td>NVIDIA GeForce RTX 3080</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>32 GB DDR4</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>1 TB SSD</td>
            </tr>
          </table>
        `,
      },
      {
        id: 24,
        product_name: "Smartwatch",
        price: 199.99,
        img_url:
          "https://images.pexels.com/photos/2861929/pexels-photo-2861929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>ExampleTech</td>
            </tr>
            <tr>
              <td>Model</td>
              <td>Smartwatch Pro</td>
            </tr>
            <tr>
              <td>Display</td>
              <td>1.4-inch AMOLED</td>
            </tr>
            <tr>
              <td>Features</td>
              <td>Heart Rate Monitor, GPS</td>
            </tr>
            <tr>
              <td>Compatibility</td>
              <td>iOS and Android</td>
            </tr>
          </table>
        `,
      },
      {
        id: 34,
        product_name: "Sofa Set",
        price: 899.0,
        img_url:
          "https://images.pexels.com/photos/6947276/pexels-photo-6947276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Material</td>
              <td>Fabric</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Gray</td>
            </tr>
            <tr>
              <td>Seating Capacity</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Dimensions</td>
              <td>96" x 36" x 34"</td>
            </tr>
            <tr>
              <td>Assembly Required</td>
              <td>No</td>
            </tr>
          </table>
        `,
      },
      {
        id: 44,
        product_name: "Bluetooth Speaker",
        price: 59.5,
        img_url:
          "https://images.pexels.com/photos/3779780/pexels-photo-3779780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>AudioBeats</td>
            </tr>
            <tr>
              <td>Connectivity</td>
              <td>Bluetooth 5.0</td>
            </tr>
            <tr>
              <td>Battery Life</td>
              <td>12 hours</td>
            </tr>
            <tr>
              <td>Water Resistance</td>
              <td>IPX7</td>
            </tr>
          </table>
        `,
      },
      {
        id: 54,
        product_name: "Kitchen Blender",
        price: 39.99,
        img_url:
          "https://images.pexels.com/photos/8357678/pexels-photo-8357678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: `
          <table>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Brand</td>
              <td>ChefMaster</td>
            </tr>
            <tr>
              <td>Power</td>
              <td>700 Watts</td>
            </tr>
            <tr>
              <td>Speed Settings</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Capacity</td>
              <td>1.5 Liters</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>White</td>
            </tr>
          </table>
        `,
      },
    ];
    data.forEach((el) => {
      if (el.id == id) {
        setDatum(el);
        return;
      }
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  return datum ? (
    <>
      <Helmet>
        <title>Product {datum?.product_name}</title>
      </Helmet>
      <Navbar></Navbar>
      <main className="container">
        <section className={style.product_container}>
          <figure>
            <img src={datum?.img_url} alt={datum?.product_name} />
          </figure>
          <article>
            <h1>{datum?.product_name}</h1>
            <span>£{datum?.price}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: datum.description,
              }}
            />
          </article>
          <div>
            <button>
              Add to Cart
              <i className="fa-solid fa-cart-plus"></i>
            </button>
            <button>
              Add to Favourite <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </section>
        <TopSlickSlider header={"Ən çox tövsiye edilən"}></TopSlickSlider>
        <TopSlickSlider header={"Ən çox satılan"}></TopSlickSlider>
      </main>
      <Footer></Footer>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default ProductDetail;
