let BASE_URL
if (process.env.NODE_ENV === "development") {
	BASE_URL = "http://localhost:4000/api/v1"; //for development
} else {
	//  BASE_URL = "https://justdoit.anhonestobserver.com/api/"; //for production if in aws or gcp
	BASE_URL = "/api/v1"; //for production in heroku
}
export default BASE_URL