const cors = require("cors");
const express = require("express");
const expressUserAgent = require("express-useragent");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");

const keys = require("./config/keys");

const userTrackingV1Routes = require("./routes/v1/user/tracking");
const userMessageV1Routes = require("./routes/v1/user/messages");


const adminAuthV1Routes = require("./routes/v1/admin/authentication");
const adminShipmentV1Routes = require("./routes/v1/admin/shipments");
const adminDashboardV1Routes = require("./routes/v1/admin/dashboard");
const adminAdminsV1Routes = require("./routes/v1/admin/admins");
const adminTrackingV1Routes = require("./routes/v1/admin/tracking");
const adminMessageV1Routes = require("./routes/v1/admin/messages");
const adminShipmentStageV1Routes = require("./routes/v1/admin/shipment-stage");


mongoose.connect(keys.mongoDBURI).then(value => {
    console.log(`Connected to MongoDB on database ${value.connection.db.databaseName}`);
}).catch(error => {
    console.log(`Error: ${error.message}`);
});

const app = express();

app.use(cors({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true
}));
app.use(helmet())
app.use(express.json());
app.use(expressUserAgent.express());
app.use(morgan("dev"));


app.use('/api/v1/user/tracking', userTrackingV1Routes);
app.use('/api/v1/user/messages', userMessageV1Routes);


app.use('/api/v1/admin/auth', adminAuthV1Routes);
app.use('/api/v1/admin/admins', adminAdminsV1Routes);
app.use('/api/v1/admin/dashboard', adminDashboardV1Routes);
app.use('/api/v1/admin/shipments', adminShipmentV1Routes);
app.use('/api/v1/admin/tracking', adminTrackingV1Routes);
app.use('/api/v1/admin/messages', adminMessageV1Routes);
app.use('/api/v1/admin/shipment-stages', adminShipmentStageV1Routes);


const port = process.env.PORT || keys.port;

app.listen(port, () => {
    console.log(`Server connected in ${keys.nodeENV} mode on port ${port}`);
});
