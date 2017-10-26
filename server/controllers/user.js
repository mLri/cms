const User = require('../models/user')
const bcrypt = require('bcryptjs')

function setJson(status, msg, data){
    return {
        status: status,
        msg: msg,
        data: data
    }
}

module.exports = {

    allUsers: async (req, res) => {
        try {
            let _allUser = await User._findAll()

            if(_allUser){
                res.status(200).json(setJson(true, '', _allUser.data))
            }else{
                res.status(403).json(setJson(false, 'Data empty.', {}))
            }
        } catch(error){
            if(error) throw error
        }
    },



    getUser: async (req, res) => {
        try {
            const _id = req.params.id
            let _user = await User._findOne({ _id: _id})
            
            // found user
            if(_user.status){
                res.status(200).json(setJson(true, '', _user.data))
            }else{
                res.status(403).json(setJson(false, 'Not found data.', {}))
            }
        } catch(error){
            if(error) throw error
        }
    },



    addUser: async (req, res) => {
        try {
            const _email = req.body.email
            const _data = req.body
    
            // check duplicate email
            let _dupEmail = await User._findOne({ email: _email })
    
            // if don't duplicate email
            if(!_dupEmail.status){
                console.log('_data => ', _data);
                let _salt = await bcrypt.genSalt(10)
                _data.pass = await bcrypt.hash(_data.pass, _salt)
                let _newUser = await User._create(_data)
                console.log('_newUser => ', _newUser)
                return res.status(200).json(setJson(true, 'Save success.', _newUser.data))
            }else{
                return res.status(403).json(
                    setJson(false, 'Email is already in use or wrong format email', {})
                )
            }
        } catch(error) {
            if(error) throw error
        }
    },


    /*
        TODO: Don't should be modify email because uniqe key
    */
    updateUser: async (req, res) => {
        try {
            const _id = req.params.id
            const _data = req.body

            let _updated = await User._update(_id, _data)
            if(_updated.status){
                res.status(200).json(setJson(true, '', _updated.data))
            }else{
                res.status(403).json(setJson(false, 'Can not update, please check id or data.'))
            }
        } catch(error){
            if(error) throw error
        }
    },



    deleteUser: async (req, res) => {
        try {
            const _id = req.params.id

            let _deleted = await User._delete(_id)
            if(_deleted.status){
                res.status(200).json(setJson(true, '', _deleted.data))
            }else{
                res.status(403).json(setJson(false, 'Can not delete, please check id', {}))
            }
        } catch(error){
            if(error) throw error
        }
    }
}