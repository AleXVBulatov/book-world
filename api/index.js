const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { v4: uuid4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// для получения категорий:
app.get("/categories", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "categories.json"));
});
// для получения товаров с query params:
app.get("/products", (req, res) => {
  const searchTitle = req.query.title;
  const searchCategorySlug = req.query.categorySlug;
  const searchPriceMin = Number(req.query.price_min);
  const searchPriceMax = Number(req.query.price_max);
  const searchInStock = String(req.query.inStock);
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);

  // console.log(offset);
  // console.log(limit);

  fs.readFile(path.join(__dirname, "db", "products.json"), "utf-8", (err, data) => {
    if (err) throw err;

    const list = JSON.parse(data);

    const filtered = list
      // для поиска по названию:
      .filter((product) => {
        const title = product.title.toLowerCase();
        const author = product.author.toLowerCase();
        const result = `${title} ${author}`;

        if (!searchTitle) {
          return result;
        } else {
          const value = searchTitle.toLowerCase();
          return result.includes(value);
        }
      })
      .filter((product) => {
        // для поиска по категории:
        if (!searchCategorySlug) return product;
        return product.category.slug.toLowerCase() === searchCategorySlug.toLowerCase();
      })
      .filter((product) => {
        // для поиска по min цене:
        if (!searchPriceMin) return product;
        return product.price >= searchPriceMin;
      })
      .filter((product) => {
        // для поиска по max цене:
        if (!searchPriceMax) return product;
        return product.price <= searchPriceMax;
      })
      .filter((product) => {
        // для поиска по наличию товара:
        if (searchInStock !== "true") return product;
        return product.qty > 0;
      })
      .filter((product, index) => {
        // для поиска по max цене:
        if (!offset) return product;
        return index >= offset;
      })
      .filter((product, index) => {
        // для поиска по max цене:
        if (!limit) return product;
        return index < limit;
      });

    res.send(JSON.stringify(filtered));
  });
});

app.get("/categories/:slug/:id", (req, res) => {
  const { id } = req.params;
  // console.log("id: ", id);
  fs.readFile(path.join(__dirname, "db", "products.json"), "utf-8", (err, data) => {
    if (err) throw err;

    const product = JSON.parse(data).find((product) => product.id === id);
    if (product) {
      res.send(product);
    } else {
      res.send("Данные продукт не найден");
    }
  });
});

app.post("/users/login", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "users.json"), "utf-8", (err, data) => {
    if (err) throw err;

    if (!data) return;

    const users = JSON.parse(data);
    const user = users.find((user) => user.email === req.body.email);

    if (!user) {
      res.send("Неверное имя пользователя или пароль");
    } else if (user.email !== req.body.email || user.password !== req.body.password) {
      res.send("Неверное имя пользователя или пароль");
    } else if (user.email === req.body.email && user.password === req.body.password) {
      res.send(user);
    }
  });
});

app.post("/users/signup", (req, res) => {
  console.log(req.body);

  fs.readFile(path.join(__dirname, "db", "users.json"), "utf-8", (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);
    const user = users.find((user) => user.email === req.body.email);

    console.log(user);

    if (user) {
      res.send("Такой пользователь уже есть");
    } else {
      res.send("Профиль создан");
      console.log("Запись");
      const newUser = {
        ...req.body,
        id: uuid4(),
        role: "costomer",
      };

      users.push(newUser);

      fs.writeFileSync(path.join(__dirname, "db", "users.json"), JSON.stringify(users), "utf-8", (err) => {
        if (err) throw err;
      });
    }
  });
});

app.patch("/users/:id", (req, res) => {
  // console.log(req.params);
  // console.log(req.body);

  fs.readFile(path.join(__dirname, "db", "users.json"), "utf-8", (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);
    const user = users.find((user) => user.id === req.body.id);
    const idx = users.findIndex((user) => user.id === req.body.id);

    if (user) {
      const updateUser = {
        ...user,
        ...req.body,
      };

      users[idx] = updateUser;

      fs.writeFileSync(path.join(__dirname, "db", "users.json"), JSON.stringify(users), "utf-8", (err) => {
        if (err) throw err;
      });

      res.send(updateUser);
    }
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
