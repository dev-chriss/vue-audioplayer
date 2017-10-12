/**
 * File.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'files', // entirely optional
  attributes: {
	    title: {
	      type: 'string',
	      required: true
	    },
	    author: {
	      type: 'string',
	      required: true
	    },
	    url: {
	      type: 'string',
	      required: true
	    },
			filename: {
	      type: 'string',
	      required: false
	    },
	    path: {
	      type: 'string',
	      required: true
	    }
	}
}
