exports.addPackages = async (req, res) => {
    try {
        res.status(201).json({message: 'Packages Added', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getPackage = async (req, res) => {
    try {
        res.status(200).json({message: 'Package Retrieved', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getPackages = async (req, res) => {
    try {
        res.status(201).json({message: 'Packages Retrieved', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.addPackage = async (req, res) => {
    try {
        res.status(200).json({message: 'Package Added', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updatePackage = async (req, res) => {
    try {
        res.status(200).json({message: 'Package Updated', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.removePackage = async (req, res) => {
    try {
        res.status(200).json({message: 'Package Removed', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
