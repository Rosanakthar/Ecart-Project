import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
          name: 'Rosan',
          email: 'admin@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'Gokul',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
      ],
    products: [
        {
            id: '1',
            name:'Sonata',
            category:'watch',
            image:'/images/sonata.jpeg',
            price:549,
            brand:'sonata',
            rating:4.5,
            numReviews: 10,
            countInStock: 12,
            description:'Men Watch Silver Color'
        },
        {
            id: '2',
            name:'Sonata Black',
            category:'watch',
            image:'/images/watch/sonatablack.jpeg',
            price:549,
            brand:'sonata',
            rating:4.5,
            numReviews: 20,
            countInStock: 10,
            description:'Men Watch Silver Color'
        },
        {
            id: '3',
            name:'LED-SQ Digital',
            category:'watch',
            image:'/images/watch/ledsq1.jpeg',
            price:449,
            brand:'LED',
            rating:3.5,
            numReviews: 15,
            countInStock: 12,
            description:'unisex Watch'
        },
        {
            id: '4',
            name:'LED-SQ Digital',
            category:'watch',
            image:'/images/watch/ledsq2.jpeg',
            price:650,
            brand:'LED',
            rating:4.5,
            numReviews: 10,
            countInStock: 5,
            description:'unisex Watch'
        },
        {
            id: '5',
            name:'Titan silver',
            category:'watch',
            image:'/images/watch/titansl.jpeg',
            price:254,
            brand:'titan',
            rating:4.5,
            numReviews: 10,
            countInStock: 5,
            description:'unisex Watch titan'
        },
        {
            id: '6',
            name:'Titan Gold',
            category:'watch',
            image:'/images/watch/titangl.jpeg',
            price:154,
            brand:'titan',
            rating:5,           
            numReviews: 10,
            countInStock: 12,
            description:'unisex Watch'
        },
    ],
    slide:[
        {
            id:'1',
            name:'kid shoo',
            image:'/images/shoos/babyshoes1.webp',
        },
        {
            id:'2',
            name:'Belt',
            image:'/images/belt1/belt1.jpg',
        }
    ]
}

export default data;