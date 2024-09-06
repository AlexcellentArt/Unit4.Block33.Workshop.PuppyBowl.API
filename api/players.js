const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

// get all players
router.get("/", async (req, res, next) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch {
    next();
  }
});

// create new player
router.post("/", async (req, res, next) => {
  try {
    // validate object
    const { name,breed,status } = await req.body;
    console.log(name,breed,status )
    if (!name) {
      throw({
        status: 400,
        message: "Player needs a name.",
      });
    }
    if (!breed) {
        throw({
            status: 400,
            message: "Player needs a breed.",
          });
      }
    if (!status) {

    throw({
        status: 400,
        message: "Player needs a status.",
    });
    }
    if (`${status}` !== "field") {
        if (`${status}` !== "bench") {
        throw( {
            status: 400,
            message: "Player needs a status that is field or bench.",
          }
        )
    }
    }
    const approved = {"name":name,"breed":breed,"status":status}
    const player = await prisma.player.create({ data: approved});
    res.json(player);
  } catch (error) {
    res.status(Math.floor(error.status)).send(error.message)
  }
});

// return single player with id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const player = await prisma.player.findUnique({ where: { id } });

    if (!player) {
      throw({
        status: 404,
        message: `Player id ${id} not found.`,
      })
    }

    res.json(player);
  } catch(error) {
    res.status(Math.floor(error.status)).send(error.message)
  }
});

// update status to field or bench
router.put("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const exists = await prisma.player.findUnique({ where: { id } });
    if (!exists) {
      throw({
        status: 404,
        message: `Player id ${id} not found.`,
      });
    }

    const { status } = await req.body;
    if (`${status}` !== "field") {
        if (`${status}` !== "bench") {
        throw( {
            status: 400,
            message: "Player needs a status that is field or bench.",
          }
        )
    }
    }
    const player = await prisma.player.update({
      where: { id } ,
      data: {"status":status}
    });
    res.sendStatus(204);
    res.json(player);
  } catch(error) {
    res.status(Math.floor(error.status)).send(error.message)
    next();
  }
});

// delete player with id
router.delete("/:id", async (req, res, next) => {

  try {
    const id = +req.params.id;

    const exists = await prisma.player.findUnique({ where: { id } });
    if (!exists) {
      throw({
        status: 404,
        message: `Player id ${id} not found.`,
      });
    }

    await prisma.player.delete({ where: { id } });

    res.sendStatus(204);
  } catch(error) {
    res.status(Math.floor(error.status)).send(error.message)
  }
});