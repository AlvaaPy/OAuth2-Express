import Content from "../models/contentModels.js";

const create = async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({
                status: 'fail',
                message: 'Title dan Content tidak boleh kosong.'
            });
        }

        const newContent = await Content.create(req.body);

        res.status(201).json({
            status: 'success',
            data: newContent
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Read All Content
const getAllContent = async (req, res) => {
    try {
        const contents = await Content.find();
        res.status(200).json({
            status: 'success',
            data: contents
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Read Single Content by ID
const getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id)
        
        if (!content) return res.status(404).json({
            status: 'fail',
            message: 'content not found'
        });
        
        res.json({
            status:'success',
            data: content
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Update Content by ID
const updateContent = async (req, res) => {
    try {
        const updateContent = await Content.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!updateContent) return res.status(404).json({
            status: 'fail',
            message: 'Content not found'
        });

        res.json({
            status:'success',
            data: updateContent
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Delete Content by ID
const deleteContent = async (req, res) => {
    try {
        const deleteContent = await Content.findByIdAndDelete(req.params.id)
        
        if (!deleteContent) return res.status(404).json({
            status: 'fail',
            message: 'Content not found'
        });
        
        res.json({
            status:'success',
            data: deleteContent
        }); 
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

export { create, getAllContent, getContentById, updateContent, deleteContent };