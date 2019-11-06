import * as express from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';

aws.config.update({
	secretAccessKey: 'YOUR_KEY',
	accessKeyId: 'YOUR_ID'
});
const s3 = new aws.S3();

const upload = multer({
	storage: multerS3({
		s3,
		bucket: 'YOUR_BUCKET',
		key: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`);
		},
		acl: 'public-read'
	})
});

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
	res.json('World');
});

router.post('/api/blogs', upload.single('blogImage'), (req, res) => {
	console.log(req.file.location);
	console.log(req.body);
	res.json('Blogs Test!');
});

export default router;
