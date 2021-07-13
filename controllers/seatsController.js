const fs = require('fs');
const path = require('path');
const seatsArrangement = require('./seatArrangement.json');

/**
 * Get status by all seats listing
 */

exports.getAllSeats = async function (req, res, next) {
    try {
        let available = 'A';
        let availableArray = [];
        let reserved = 'R';
        let reservedArray = [];
        let sold = 'S';
        let soldArray = [];
        let allSeats = {};
        let totalSeats = seatsArrangement;
        for (key in totalSeats) {
            let totalSeatArray = totalSeats[key];
            for (let i = 0; i < totalSeatArray.length; i++) {
                if (totalSeatArray[i].status == available) {
                    availableArray.push(totalSeatArray[i].id);
                }
                if (totalSeatArray[i].status == reserved) {
                    reservedArray.push(totalSeatArray[i].id);
                }
                if (totalSeatArray[i].status == sold) {
                    soldArray.push(totalSeatArray[i].id);
                }
            }
        }
        allSeats.sold = soldArray;
        allSeats.reserve = reservedArray;
        allSeats.available = availableArray;
        res.status(200).send(allSeats);
    } catch (err) {
        res.status(401).send(err);
    }
}

/**
 * Get continuous seats listing per seat count
 */

exports.getAllocatedSeats = async function (req, res, next) {
    try {
        let needSeats = req.params.numOfSeats ? parseInt(req.params.numOfSeats) : 0;
        let seatListArray = [];
        let available = 'A';
        let availableArray = [];
        if (needSeats) {
            let totalSeats = seatsArrangement;
            for (key in totalSeats) {
                let totalSeatArray = totalSeats[key];
                const checkAvailable = totalSeatArray.filter(elem => elem.status === available);
                if (checkAvailable.length >= needSeats) {
                    let firstIndex = checkAvailable[0];
                    for (let i = 0; i < checkAvailable.length; i++) {
                        if (i == 0 && checkAvailable[1].rank == checkAvailable[0].rank + 1) {
                            seatListArray.push(checkAvailable[i].id)
                            availableArray = seatListArray;
                            firstIndex = checkAvailable[i];
                        } else {
                            if (checkAvailable[i + 1] || checkAvailable[i - 1]) {
                                if (firstIndex.rank + 1 == checkAvailable[i].rank) {
                                    seatListArray.push(checkAvailable[i].id)
                                    availableArray = seatListArray;
                                    firstIndex = checkAvailable[i];
                                }
                            }
                        }
                    }
                }
            }
            res.send(availableArray);
        } else {
            res.status(500).send({ status: false, message: 'Please check your input' });
        }
    } catch (err) {
        res.status(401).send(err);
    }
}

/**
 * Update seat status with using row no, seat updated status and seat no (seat no is mutiple)
 */

exports.changeSeatstatus = async function (req, res, next) {
    try {
        let seatRowNo = req.params.rowNo ? req.params.rowNo : '';
        let seatStatus = req.params.status ? req.params.status : '';
        let seatNo = req.params.seatNo ? req.params.seatNo : '';
        if (seatRowNo && seatStatus && seatNo) {
            let status = '';
            if (seatStatus == 'sold') {
                status = 'S';
            }
            if (seatStatus == 'available') {
                status = 'A';
            }
            if (seatStatus == 'reserved') {
                status = 'R';
            }
            seatNo = seatNo.split(',');
            let totalSeats = seatsArrangement;
            let updateRow = totalSeats[seatRowNo];

            for (let i = 0; i < updateRow.length; i++) {
                for (let j = 0; j < seatNo.length; j++) {
                    if (updateRow[i].id == seatNo[j]) {
                        updateRow[i]['status'] = status;
                    }
                }
            }
            totalSeats[seatRowNo] = updateRow;
            let updatedSeatData = JSON.stringify(totalSeats);
            fs.writeFileSync(path.resolve(__dirname, '\seatArrangement.json'), updatedSeatData);
            res.status(200).send({ status: true, message: 'Sucecssfully updated' });
        } else {
            res.status(500).send({ status: false, message: 'Please check your input' });
        }
    } catch (err) {
        res.status(401).send(err);
    }
}