import * as React from 'react';
import { useRef } from 'react';

const App: React.FC<AppProps> = props => {
	const fileInput = useRef<HTMLInputElement>();

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const data = new FormData();
		data.append('title', 'Test Blog Title');
		data.append('content', 'lorem ipsum blah blah');
		data.append('blogImage', fileInput.current.files[0]);
		await fetch('/api/blogs', {
			method: 'POST',
			body: data
		});
	};

	return (
		<main className="container">
			<section className="row my-5 justify-content-center">
				<div className="col-md-9">
					<form className="form-group p-3 border shadow">
						<input ref={fileInput} type="file" className="form-control-file" />
						<button onClick={handleClick} className="btn btn-primary btn-block w-75 mx-auto mt-3 shadow">
							Submit
						</button>
					</form>
				</div>
				<div className="col-md-12">
					<img src="https://lukes-projects.s3.amazonaws.com/1573073655909-sword_shoulder.jpg" alt="kitty cat!" style={{ height: '50px', width: '50px' }} />
				</div>
			</section>
		</main>
	);
};

interface AppProps {}

export default App;
