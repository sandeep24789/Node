const express = require('express');
const bodyParser = require('body-parser');
const { connection } = require('./db/connection');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
var data = {};
var result=[];
var incidentData = {};
var incidentData1 = {};
var agingAccData = {};
var agingAmdData = {};
var agingBusData = {};
var agingNCData = {};
var agingNetData = {};
//var agingID = {};
var agingPromise;
var incidentPromise;

app.get('/summary', (req, res) => {
    var sql = "SELECT * FROM helix.domain";
    connection.query(sql, (err, result) => {
        if (err)
            throw err;

        Object.keys(result).forEach(key => {
            var incidentSql = `SELECT * FROM helix.incident_summary where ID=${result[key].Incident_Summary_ID}`;
            console.log(incidentSql);
            incidentPromise = new Promise((resolve,reject)=> {
                connection.query(incidentSql, (err, result) => {
                    Object.keys(result).forEach(key => {
                        incidentData = {
                            RAG: result[key].RAG,
                            Current_Backlog: result[key].Current_Backlog,
                            Amdocs: result[key].Amdocs,
                            Accenture: result[key].Accenture,
                            Netcracker: result[key].Netcracker,
                            Business: result[key].Business,
                            Networks: result[key].Networks,
                            Backlog_Target: result[key].Backlog_Target,
                            Aging_Amdocs_ID: result[key].Aging_Amdocs_ID,
                            Aging_Accenture_ID: result[key].Aging_Accenture_ID,
                            Aging_Netcracer_ID: result[key].Aging_Netcracer_ID,
                            Aging_Business_ID: result[key].Aging_Business_ID,
                            Aging_Network_ID: result[key].Aging_Network_ID
                        }
                    })
                    resolve();
                })
            })

            incidentPromise.then(()=> {
                var aging_sql = `SELECT 
                acc.Type1 acc_type1,
                acc.Type2 acc_type2,
                acc.Type3 acc_type3,
                acc.Type4 acc_type4,
                amd.Type1 amd_type1,
                amd.Type2 amd_type2,
                amd.Type3 amd_type3,
                amd.Type4 amd_type4,
                bus.Type1 bus_type1,
                bus.Type2 bus_type2,
                bus.Type3 bus_type3,
                bus.Type4 bus_type4,
                nc.Type1 nc_type1,
                nc.Type2 nc_type2,
                nc.Type3 nc_type3,
                nc.Type4 nc_type4,
                net.Type1 net_type1,
                net.Type2 net_type2,
                net.Type3 net_type3,
                net.Type4 net_type4
            FROM
                helix.aging_accenture acc,
                helix.aging_amdocs amd,
                helix.aging_business bus,
                helix.aging_netcracker nc,
                helix.aging_network net
            WHERE
                acc.ID = ${incidentData.Aging_Accenture_ID}
                AND amd.ID = ${incidentData.Aging_Amdocs_ID}
                    AND bus.ID = ${incidentData.Aging_Business_ID}
                    AND nc.ID = ${incidentData.Aging_Netcracer_ID}
                    AND net.ID = ${incidentData.Aging_Network_ID} `;

                   // console.log(aging_sql);
                    agingPromise = new Promise((resolve, reject) => {
                        connection.query(aging_sql, (err, result) => {

                            agingAccData = {
                                AccType1: result[0].acc_type1,
                                AccType2: result[0].acc_type2,
                                AccType3: result[0].acc_type3,
                                AccType4: result[0].acc_type4
                            }

                            agingAmdData = {
                                AmdType1: result[0].amd_type1,
                                AmdType2: result[0].amd_type2,
                                AmdType3: result[0].amd_type3,
                                AmdType4: result[0].amd_type4
                            }

                            agingBusData = {
                                BusType1: result[0].bus_type1,
                                BusType2: result[0].bus_type2,
                                BusType3: result[0].bus_type3,
                                BusType4: result[0].bus_type4
                            }

                            agingNCData = {
                                NCType1: result[0].nc_type1,
                                NCType2: result[0].nc_type2,
                                NCType3: result[0].nc_type3,
                                NCType4: result[0].nc_type4
                            }

                            agingNetData = {
                                NetType1: result[0].net_type1,
                                NetType2: result[0].net_type2,
                                NetType3: result[0].net_type3,
                                NetType4: result[0].net_type4
                            }
                            //console.log("agingData", agingNetData);
                            resolve('OK');
                        })
                    })

                    agingPromise.then(() => {
                        //incidentPromise = new Promise((resolve, reject) => {
                            incidentData1 = {
                                RAG: incidentData.RAG,
                                Current_Backlog: incidentData.Current_Backlog,
                                Amdocs: incidentData.Amdocs,
                                Accenture: incidentData.Accenture,
                                Netcracker: incidentData.Netcracker,
                                Business: incidentData.Business,
                                Networks: incidentData.Networks,
                                Backlog_Target: incidentData.Backlog_Target,
                                Aging_Amdocs: agingAmdData,
                                Aging_Accenture_ID: agingAccData,
                                Aging_Netcracer_ID: agingNCData,
                                Aging_Business_ID: agingBusData,
                                Aging_Network_ID: agingNetData
                            }
                            //resolve(incidentData);
                            console.log(incidentData1);
                            data = {
                                Name: result[key].Name,
                                IncidentData: incidentData1,
                                Fallout_Summary_ID: result[key].Incident_Summary_ID
                            }
                            result.push(data);
                            console.log(result);
                            res.send(data);
                        })
                        
            }) 
        })
            

        })
        //res.send(data);
    });


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});