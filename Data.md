
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    title TEXT,
    brand TEXT,
    price INTEGER,
    rating  TEXT,
    category TEXT,
    image_url TEXT,
    
)

categories=[CLOTHING,ELECTRONICS,APPLIANCES,GROCERY,TOYS]

## Querires
INSERT INTO products (id, title, brand, price, rating, category, image_url)

VALUES

(16,"Embroidered Net Gown","Manyavar",62990,"3.2","CLOTHING","https://assets.ccbp.in/frontend/react-js/ecommerce/cloths-long-fork.png"),
(24,"Front Load Machine","Samsung",22490,"4.5","APPLIANCES","https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-washing-machine.png"),
(33,"Collider Black Dial Men's Watch","Fossil",14995,"4.3","ELECTRONICS","https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-belt-watch.png"),
(18,"True Wireless Earbuds","LG",13499,"4.4","APPLIANCES","https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-ear-buds.png"),
(35,"Maritime Men's Watch","Titan",11999,"4.3","ELECTRONICS","https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-tatar-watch.png"),
(34,"Neutra Analog Men's Watch","Fossil",10995,"4.1","ELECTRONICS","https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png"),
(48,"Monsters Charm Toy","Trendytap",8600,"4.2","TOYS","https://assets.ccbp.in/frontend/react-js/ecommerce/toys-minnos.png"),
(31,"Privateer Quartz Watch","Fossil",8122,"4.4","ELECTRONICS","https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-black-watch.png"),
(32,"Chronograph black Watch","Fossil",6395,"3.8","ELECTRONICS","https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-watch.png"),
(22,"Podcast Microphone","MAONO",5555,"4.4","APPLIANCES","https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-singing-mike.png")