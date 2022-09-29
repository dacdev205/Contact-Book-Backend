const ContactService = require('../services/contact.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.create(req.body);
        return res.snd(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error ocurred while creating the contact")       
        );
    }
};


//Cài đặt handler findAll
exports.findAll = async (req, res, next) => {
    let document = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if(name) {
            document = await contactService.findByName(name);
        }else {
            document = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contact")
        );
    }

    return res.send(document);
};



exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(Mongo.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(
            500,
             `Error retrieving contact with id =${req.params.id}`
             )
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body.length) === 0) {
        return nex(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(Mongo.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating contact with id =${req.params.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const contact = await ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        new ApiError(
            500,
            `Could not delete contact with id =${req.params.id}`
        )
    };
};
exports.deleteAll = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contact were deleted successfully`,
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing contact")
        );
    }
};
exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};

