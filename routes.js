/**
 * Contains HTTP handlers for admin authentication functionality
 */
"use strict";
var business = require('./business');

var StatusResponse = require('./lib/statusResponse').StatusResponse;


function isAlive(request, response){
	business.isAlive(function(err, statusResponse) {
		response.writeHead(200, 'success', {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'});
		response.end(statusResponse);
	});
}

function listAllMembers(request, response) {
	business.listAllMembers(function(err, statusResponse) {
		response.writeHead(200, 'success', {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'});
		response.end(statusResponse);
	})
}

function listMembers(request, response) {
	var filterSpec = null;
	var pageSpec = null;
	var field = request.query.field;
	var value = request.query.value;
	var pageNum = request.query.pageNum;
	var pageLength = request.query.pageLength;
	var matchstring = request.query.matchstring;
	var fieldSpec = request.query.fieldSpec || {};

	if (matchstring) {
		business.filterMembersByName(matchstring, function (err, statusResponse) {
			response.send(statusResponse);
		});
	}
	else {
		if (field && value) {
			filterSpec = {field: field, value: value};
		}
		if (pageNum && pageLength) {
			pageSpec = {pageLength: parseInt(pageLength), pageNum: parseInt(pageNum)};
		}
		business.listMembers(filterSpec, pageSpec, fieldSpec, function (err, statusResponse) {
			response.send(statusResponse);
		})
	}
}

function filterMembersByName(request, response) {
	var matchstring = request.params.matchstring || '';
	business.filterMembersByName(matchstring, function(err, statusResponse) {
		response.send(statusResponse);
	});
}


function getMember(request, response) {
	var sOId = request.params.oid || '';
	business.getMember(sOId, function(err, statusResponse) {
		response.send(statusResponse);
	});
}

function insertMembers(request, response) {
	business.insertMembers(function(err, statusResponse) {
		response.send(statusResponse);
	})
}

exports.getMember = getMember;
exports.filterMembersByName = filterMembersByName;
exports.isAlive = isAlive;
exports.listMembers = listMembers;
//exports.insertMembers = insertMembers;
