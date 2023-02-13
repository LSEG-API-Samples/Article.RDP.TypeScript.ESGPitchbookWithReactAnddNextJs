"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainRecordImpl = void 0;
const chain_record_interface_1 = require("./chain-record.interface");
class ChainRecordImpl {
    constructor(data) {
        this.data = data;
        this.linkFieldsValues = [];
        this.isValidRecord = !!this.data[chain_record_interface_1.REF_COUNT_FIELD_NAME];
        this.displayTemplate = this.detectDisplayTemplate();
        this.fieldNames = this.initFields();
        this.nextCR = this.data[this.fieldNames.nextField];
        this.prevCR = this.data[this.fieldNames.prevField];
    }
    get linkFields() {
        if (!this.linkFieldsValues.length) {
            this.parseChainRecord();
        }
        return this.linkFieldsValues;
    }
    get isValidChainRecord() {
        return this.isValidRecord;
    }
    updateChainRecord(data) {
        if (!this.isValidChainRecord) {
            return [];
        }
        this.updateData(data);
        const updatedIndexes = Object.keys(data)
            .map(fieldName => this.fieldNames.fields.indexOf(fieldName))
            .filter(v => v !== -1);
        return updatedIndexes;
    }
    parseChainRecord() {
        if (!this.isValidChainRecord) {
            return;
        }
        this.linkFieldsValues = this.getLinkFieldsValues();
    }
    detectDisplayTemplate() {
        if (this.isValidDisplayTemplate(this.data[chain_record_interface_1.PREF_DISPLAY_FIELD_NAME])) {
            return this.data[chain_record_interface_1.PREF_DISPLAY_FIELD_NAME];
        }
        if (this.isValidDisplayTemplate(this.data[chain_record_interface_1.PREV_DISPLAY_FIELD_NAME])) {
            return this.data[chain_record_interface_1.PREV_DISPLAY_FIELD_NAME];
        }
        return this.data[chain_record_interface_1.RND_DISPLAY_FIELD_NAME];
    }
    initFields() {
        const is10CharsChainRecord = this.isValidNumberCharsChainRecord(chain_record_interface_1.LINK_FIELD_10_CHARS_TEMPLATE);
        const is17CharsChainRecord = this.isValidNumberCharsChainRecord(chain_record_interface_1.LINK_FIELD_17_CHARS_TEMPLATE);
        const is32CharsChainRecord = this.isValidNumberCharsChainRecord(chain_record_interface_1.LINK_FIELD_32_CHARS_TEMPLATE);
        if (is10CharsChainRecord) {
            return this.getFieldNames(chain_record_interface_1.TemplateType.Chars10Template);
        }
        if (is17CharsChainRecord) {
            return this.getFieldNames(chain_record_interface_1.TemplateType.Chars17Template);
        }
        if (is32CharsChainRecord) {
            return this.getFieldNames(chain_record_interface_1.TemplateType.Chars32Template);
        }
        return { fields: [], nextField: '', prevField: '' };
    }
    isValidDisplayTemplate(value) {
        return !!value && chain_record_interface_1.INVALID_DISPLAY_TEMPLATE_VALUES.every(v => v !== value);
    }
    isValidNumberCharsChainRecord(fieldName) {
        const refCount = this.data[chain_record_interface_1.REF_COUNT_FIELD_NAME];
        const linkFieldNames = this.generateLinkFieldNames(fieldName, refCount);
        const chainRecordFieldNames = Object.getOwnPropertyNames(this.data);
        return linkFieldNames.every(name => chainRecordFieldNames.includes(name));
    }
    getFieldNames(templateType) {
        const refCount = this.data[chain_record_interface_1.REF_COUNT_FIELD_NAME];
        switch (templateType) {
            case chain_record_interface_1.TemplateType.Chars10Template:
                return {
                    fields: this.generateLinkFieldNames(chain_record_interface_1.LINK_FIELD_10_CHARS_TEMPLATE, refCount),
                    nextField: chain_record_interface_1.NEXT_FIELD_10_CHARS_TEMPLATE,
                    prevField: chain_record_interface_1.PREV_FIELD_10_CHARS_TEMPLATE,
                };
            case chain_record_interface_1.TemplateType.Chars17Template:
                return {
                    fields: this.generateLinkFieldNames(chain_record_interface_1.LINK_FIELD_17_CHARS_TEMPLATE, refCount),
                    nextField: chain_record_interface_1.NEXT_FIELD_17_CHARS_TEMPLATE,
                    prevField: chain_record_interface_1.PREV_FIELD_17_CHARS_TEMPLATE,
                };
            case chain_record_interface_1.TemplateType.Chars32Template:
                return {
                    fields: this.generateLinkFieldNames(chain_record_interface_1.LINK_FIELD_32_CHARS_TEMPLATE, refCount),
                    nextField: chain_record_interface_1.NEXT_FIELD_32_CHARS_TEMPLATE,
                    prevField: chain_record_interface_1.PREV_FIELD_32_CHARS_TEMPLATE,
                };
        }
    }
    generateLinkFieldNames(fieldName, refCount) {
        return Array.from({ length: refCount }).map((v, i) => `${fieldName}${i + 1}`);
    }
    getLinkFieldsValues() {
        return this.fieldNames.fields.map((field) => this.data[field]);
    }
    updateData(data) {
        const updatedFields = Object.entries(data);
        this.data = updatedFields.reduce((acc, [name, value]) => {
            if (this.fieldNames.fields.includes(name)) {
                acc[name] = value;
            }
            return acc;
        }, this.data);
        this.parseChainRecord();
    }
}
exports.ChainRecordImpl = ChainRecordImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4tcmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvcHJpY2luZy9jaGFpbi9jaGFpbi1yZWNvcmQvY2hhaW4tcmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQW1Ca0M7QUFFbEMsTUFBYSxlQUFlO0lBZ0J4QixZQUFvQixJQUE4QjtRQUE5QixTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUoxQyxxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFLcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2Q0FBb0IsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFXLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDakUsQ0FBQztJQXJCRCxJQUFXLFVBQVU7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFFRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0lBaUJELElBQVcsa0JBQWtCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRU0saUJBQWlCLENBQUMsSUFBOEI7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQixPQUFPLEVB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