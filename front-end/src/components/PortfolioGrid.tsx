import React from "react";

const PortfolioGrid: React.FC = () => {
    return (
        <div className="container">
		<div className="row centered mt mb">
			<h1>My Portfolio</h1>
			
			<div className="col-lg-4 col-md-4 col-sm-4 gallery">
				<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio01.png`} className="img-responsive"></img></a>
			</div>
			<div className="col-lg-4 col-md-4 col-sm-4 gallery">
				<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio02.png`} className="img-responsive"></img></a>
			</div>
			<div className="col-lg-4 col-md-4 col-sm-4 gallery">
				<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio03.png`} className="img-responsive"></img></a>
			</div>
			<div className="col-lg-4 col-md-4 col-sm-4 gallery">
				<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio04.png`} className="img-responsive"></img></a>
			</div>
			<div className="col-lg-4 col-md-4 col-sm-4 gallery">
				<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio05.png`} className="img-responsive"></img></a>
			</div>
			<div className="col-lg-4 col-md-4 col-sm-4 gallery">
				<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio06.png`} className="img-responsive"></img></a>
			</div>
		</div>
	</div>
    )
}


export default PortfolioGrid;