import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import logger from '../logger';
cloudinary.v2.config({
	cloud_name: '',
	api_key: '',
	api_secret: '',
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary.v2,

	params: async (req: any, file: any) => {
		// async code using `req` and `file`
		const extension = file.originalname.split('.').pop();
		const fileName = `${uuidv4()}`;
		logger.info(`Insert successfully file ${fileName} cloundynary`);

		return {
			folder: 'data',
			format: extension,
			resource_type: 'auto',
			public_id: fileName,
		};
	},
});

const upload = multer({ storage: storage });

async function deleteFileCloudynary(url?: string) {
	if (!url) return;
	const public_id = cloudinary.v2.url(url, { type: 'upload' });
}

export default upload;
export { deleteFileCloudynary };
