const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

async function list(req, res) {
  const users = await CustomersModel.find()

  res.render('list', {
    title: 'Listagem de Usuarios',
    users,
  })
}

function addForm(req, res) {
  res.render('register', {
    title: defaultTitle
  })
}

async function addAction(req, res) {
  const { name, age, email, password } = req.body

  const passwordCrypto = await crypto(password)

  const register = new CustomersModel({
    name,
    age,
    email,
    password: passwordCrypto,
  })

  register.save()

  res.render('register', {
    title: defaultTitle,
    message: 'Cadastro realizado com sucesso'
  })
}

async function editForm(req, res) {
  const { id } = req.query

  const user = await CustomersModel.findById(id)

  res.render('edit', {
    title: 'Editar Usuario',
    user,
  })
}

async function editAction(req, res) {
  const { name, age, email } = req.body
  const { id } = req.params

  const user = await CustomersModel.findById(id)

  user.name = name
  user.age = age
  user.email = email

  user.save()

  res.render('edit', {
    title: defaultTitle,
    user,
    message: 'Usuario atualizado com sucesso'
  })
}

async function removeAction(req, res) {
  const { id } = req.params

  const remove = await CustomersModel.deleteOne({ _id: id })

  if (remove.deletedCount) {
    res.redirect('/list')
  }
}

module.exports = {
  list,
  addForm,
  addAction,
  editForm,
  editAction,
  removeAction,
}