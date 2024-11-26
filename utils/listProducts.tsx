import Image from "next/image";


export const listProducts = [
    {
      id: "1",
      name: "Onyx Studio 8",
      description: "Create your own vibe with the Harman Kardon Onyx Studio 8. Both stylish and sustainable, it's crafted from recycled materials, combining eco-friendly choices and beautiful design. Use the sleek, anodized aluminum handle to carry the portable speaker anywhere.",
      price: 279.99,
      brand: "Harman",
      category: "Bluetooth Speakers",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image: "/images/OS8_black.png",
            
        },
        {
          color: "White",
          colorCode: "#FFFFFF",
          image: "/images/OS8_grey.png",
        },
        {
          color: "Blue",
          colorCode: "#0000FF",
          image: "/images/OS8_blue.png",
            
        },
      ],
      reviews: [],
    },
    {
      id: "2",
      name: "Harman Kardon Go + Play 3",
      description: "With its refined silhouette, substantial, high-quality aluminum handle, and tempered glass touch panel, the Harman Kardon Go + Play 3's sleek design looks beautiful and sounds even better—thanks to its high output and crystal clear 3-way stereo sound.",
      price: 299.99,
      brand: "Harman",
      category: "Bluetooth Speakers",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image: "/images/play3_black.png",
        },
        {
          color: "White",
          colorCode: "#FFFFFF",
          image: "/images/play3_white.png",
        },
      ],
      reviews: [
        {
          id: "45115581",
          userId: "a",
          productId: "2",
          rating: 5,
          comment: "good",
          createdDate: "2023-07-06T06:08:33.067Z",
          user: {
            id: "6475af156bad4917456e6e1e",
            name: "Juan",
            email: "example@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
            hashedPassword: null,
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
          },
        },
      ],
    },
    {
      id: "3",
      name: "Harman Kardon Citation 500",
      description: "The Harman Kardon Citation 500 is a next generation stereo smart speaker designed for large rooms. Easy to use with its full-color LCD touch screen, Citation 500 blends innovation in home audio with attention to detail in design, allowing for sophisticated looks and powerful sound.",
      price: 474.99,
      brand: "Harman",
      category: "Bluetooth Speakers",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image: "/images/citation.png",
        },
      ],
      reviews: [
        {
          id: "6499b4887402b0efd394d8f3",
          userId: "6499b184b0e9a8c8709821d3",
          productId: "3",
          rating: 4,
          comment:
            "good enough. I like the crearly sound.",
          createdDate: "2023-06-26T15:53:44.483Z",
          user: {
            id: "6499b184b0e9a8c8709821d3",
            name: "Chaoo",
            email: "example1@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
            hashedPassword: null,
            createdAt: "2023-06-26T15:40:52.558Z",
            updatedAt: "2023-06-26T15:40:52.558Z",
            role: "USER",
          },
        },
        {
          id: "6499a110efe4e4de451c7edc",
          userId: "6475af156bad4917456e6e1e",
          productId: "3",
          rating: 5,
          comment: "I really liked it!!",
          createdDate: "2023-06-26T14:30:40.998Z",
          user: {
            id: "6475af156bad4917456e6e1e",
            name: "Charles",
            email: "example@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
            hashedPassword: null,
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
          },
        },
      ],
    },
    {
      id: "4",
      name: "Enchant Subwoofer",
      description: "The Harman Kardon Enchant Subwoofer adds superior bass to the Enchant 1300 or 800 soundbars. Beautifully styled and featuring a 10” woofer, the Enchant Subwoofer’s wireless design easily enables an infinite number of placement options throughout your home theater. The state-of-the-art design delivers thunderous low tones that make your entertainment more exciting.",
      price: 619.99,
      brand: "Harman",
      category: "Subwoofers",
      inStock: true,
      images: [
        {
          color: "Graphite",
          colorCode: " #383838",
          image: "/images/enchant.png",
        },
      ],
      reviews: [],
    },
    {
      id: "5",
      name: "Harman Kardon Aura Studio 4",
      description:"Inspire your senses with enchanting lights that dance to the rhythms of beautiful Harman Kardon sound. The iconic transparent dome of the Aura Studio 4 radiates a captivating diamond pattern that glows in all directions. Match one of its 5 distinct animated themes to the beat of your music. ",
      price: "279.99",
      brand: "Harman",
      category: "Subwoofers",
      inStock: false,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image: "/images/aura.png",
        },
      ],
      reviews: [],
    },
  ];