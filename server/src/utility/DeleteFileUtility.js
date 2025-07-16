import fs from 'fs';
import path from 'path';

export const deleteUploadedFile = async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(process.cwd(), "uploads", filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return res.json({ status: true, msg: "File deleted successfully" });
        } else {
            return res.json({ status: false, msg: "File not found" });
        }
    } catch (error) {
        return res.json({ status: false, msg: "Server error", error: error.message });
    }
};