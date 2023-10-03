const express = require("express")
const router = express.Router()
const Posts = require("../Models/Posts")
const { validateJWT, checkLoggedIn } = require("../utils/middleware")
const formatDate = require("../utils/formatDate")

router.get("/", validateJWT, async (req, res) => {
	const posts = await Posts.find()
	res.render("index", {posts, loggedIn: checkLoggedIn(req), formatDate})
})

router.get("/login", validateJWT, (req, res) => {
	res.render("login", {loggedIn: checkLoggedIn(req)})
})

router.get("/post", validateJWT, (req, res) => {
	res.render("create-post", {loggedIn: checkLoggedIn(req)})
})

router.get("/dashboard", validateJWT, async (req, res) => {
	const posts = await Posts.find()
	res.render("dashboard", {loggedIn: checkLoggedIn(req), posts})
})

router.get("/settings", validateJWT, (req, res) => {
	res.render("settings", {loggedIn: checkLoggedIn(req)})
})

module.exports = router