import { Rules } from "./Rules";

export class Validator{

    static _ruleId = 1000;

    constructor(CustomeRules){
        this._form = null;
        this._rules = {};
        this._ruleSets = CustomeRules?new CustomeRules():new Rules();
    }

    get rules(){
        return this._rules;
    }

    init(form){
        if(!form) throw new Error('Form instance expected.');
        this._form = form;
        this._attachForm(form);
    }

    addRule(field, rule){
        if(!field||!rule) {
            throw new Error('Invalid field or rule');
        }
        this._rules[field] = this._rules[field]||[];
        let validator = this._ruleSets[rule.validFun];
        if(!validator){
            throw new Error(`${rule.validFun}没找到对应的规则`);
        }
        if(this._form){
            validator = validator.apply(null, [this._form, ...rule.args]);
        }
        let ruleId = Validator._ruleId++;
        rule = {ruleId, validator, ...rule, hasForm: !!this._form};
        this._rules[field].push(rule);
        return ruleId
    }

    addRules(field, rules){
        if(!field||!rules){
            throw new Error('Invalid field or rules');
        }
        let ruleIds = [];
        let n = rules.length;
        for(let i=0;i<n;i++){
            let rule = rules[i];
            let ruleId = this.addRule(field, rule);
            if(ruleId){
                ruleIds.push(ruleId);
            }
        }
        return ruleIds;
    }

    _attachForm(form){
        if(!form) return;
        let keys = Object.keys(this._rules);
        keys.forEach(key=>{
            let validators = this._rules[key];
            validators.forEach(i=>{
                if(!i.hasForm){
                    i.hasForm = true;
                    i.validator = i.validator.apply(null, [form, ...i.args]);
                }
            });
        });
    }
    
}