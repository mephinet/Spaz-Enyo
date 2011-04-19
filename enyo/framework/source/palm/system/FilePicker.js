/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
/**
A FilePicker control is used for allowing the user to choose files using the standard picker UI.
	
The onPickFile event fires with a response from the file picker if/when the user chooses a file.
The response object is an array of objects indicating chosen files:
[
	{
		fullPath: // Absolute File Path.
		iconPath: // Absolute File Path with ExtractFS prefix.
		attachmentType: // File Type (image, document, audio, video)
		size: // File Size in Bytes.
	},
	{
		...
	},
	...
]
*/
enyo.kind({
	name: "enyo.FilePicker",
	kind: "enyo.Popup",
	published: {
		fileType: undefined, 		/** Optional string or array.  Limits displayed files to the given type (or types).  
										Possible types are: 'image', 'audio', 'video', 'document'.*/
		previewLabel: undefined,	//* Optional free form string to override the default string displayed at the top panel.
		extensions: undefined,		//* Optional array of file extension strings, used to filter displayed files.
		allowMultiSelect: false,	//* Optional boolean indicating if selection of multiple files is allowed.
		currentRingtonePath:undefined, //* Optional string contains the current ringtone absolute file path.
		cropWidth:undefined, //* Optional int to set the width of the crop window.
		cropHeight:undefined //* Optional int to set the height of the crop window.
	},
	events: {
		onPickFile:"" //* Sent with a response from the file picker (see above) when the user chooses a file.
	},
	height:"480px",
	width:"380px",
	dismissWithClick:false,
	modal:true,
	scrim:true,
	filePickerPath: "/usr/lib/luna/system/luna-systemui/app/FilePicker/filepicker.html",
	components: [
		{name: 'crossapp', kind:"CrossAppUI", onResult: "handleResult"}
	],
	//* Activates the modal FilePicker UI.
	pickFile: function() {
		this.updateParams();
		this.$.crossapp.setPath(this.filePickerPath);
		this.openAtCenter(); //It opens at the center for now.
	},
	updateParams: function() {
		var params = {};
		var that = this;
		// Copy all published properties to the params object.
		Object.keys(this.published).forEach(function(key) {
			if(that[key] !== undefined) {
				params[key] = that[key];
			}
		});
		// Need to put arrays of types in fileTypes instead of fileType.
		if (this.fileType && !enyo.isString(this.fileType)) {
			params.fileTypes = this.fileType;
			params.fileType = undefined;
		}
		this.$.crossapp.setParams(params);
	},
	handleResult: function(inSender, result) {
		this.$.crossapp.setPath("");
		if (result.result) {
			this.doPickFile(result.result);
		}
		this.close();
	}
});
