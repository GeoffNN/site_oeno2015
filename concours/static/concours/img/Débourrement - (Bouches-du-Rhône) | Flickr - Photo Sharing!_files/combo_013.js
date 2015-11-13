YUI.add("flickr-subscriptions-braintree-deletePaymentMethod-deletor",function(e,t){"use strict";function n(e,t){}function r(n,r){var i={};return i.payment_method_id=n.id,e.Promise.all([r.callAPI("flickr.subscriptions.braintree.deletePaymentMethod",i)]).then(null,e.FetcherErrorLogger(t))}e.namespace("ModelDeletors")["flickr-subscriptions-braintree-deletePaymentMethod-deletor"]={run:r,_processResponse:n}},"@VERSION@",{requires:["flickr-promise"],optional:[]});
YUI.add("flickr-products-shipping-fetcher",function(e,t){"use strict";function n(e){var t={};return t.order_id=e.id,t}function r(e,t){var n,r,i;r=e&&e[0]&&e[0].orderInfo&&e[0].orderInfo.shippingAddress?e[0].orderInfo.shippingAddress:{},i={orderId:e[0].orderInfo.orderId,id:t.id,city:r.city||"",countryCode:r.countryCode||"US",firstName:r.firstName||"",lastName:r.lastName||"",phone:r.phone||"",postalCode:r.postalCode||"",state:r.state||"",street1:r.street1||"",street2:r.street2||""},n=e[1],n.exists(t.id)?(delete i.id,n.setValues(t.id,i)):n.add(i)}function i(n,r){var i=this;return e.Promise.all([r.callAPI("flickr.products.orders.getShippingAddress",this._processParams(n)),r.getModelRegistry("products-address-models")]).then(function(e){return i._processResponse(e,n)},e.FetcherErrorLogger(t))}e.namespace("ModelFetchers")["flickr-products-shipping"]={run:i,_processResponse:r,_processParams:n}},"@VERSION@",{requires:["flickr-promise","api-helper"],optional:["products-address-models"]});
YUI.add("flickr-products-orders-setShippingAddress-updater",function(e,t){"use strict";function n(e){var t;if(!e||!e.orderInfo)throw new Error(-2);t=e.orderInfo;if(typeof t.isValidAddress!="undefined"&&t.isValidAddress==="false")throw new Error(-1);return!0}function r(r,i){var s,o=r;return s={order_id:o.id,first_name:o.firstName,last_name:o.lastName,street1:o.street1,street2:o.street2,city:o.city,state:o.state,postal_code:o.postalCode,country_code:o.countryCode||"US",phone:o.phone,shipping_type:o.shippingType},i.callAPI("flickr.products.orders.setShippingAddress",s).then(n,e.FetcherErrorLogger(t))}e.namespace("ModelUpdaters")["flickr-products-orders-setShippingAddress"]={run:r}},"@VERSION@",{requires:["flickr-promise"],optional:[]});
YUI.add("flickr-products-orders-clearAddress-deletor",function(e,t){"use strict";function n(e){return!0}function r(r,i){var s;return s={order_id:r.orderId,first_name:"",last_name:"",street1:"",street2:"",city:"",state:"",postal_code:"",country_code:"US",phone:"",clear_shipping_address:1},i.callAPI("flickr.products.orders.setShippingAddress",s).then(n,e.FetcherErrorLogger(t))}e.namespace("ModelDeletors")["flickr-products-orders-clearAddress"]={run:r}},"@VERSION@",{requires:["flickr-promise"],optional:[]});
YUI.add("products-address-models",function(e){function t(e){t.superclass.constructor.call(this,e)}e.Models[this.name]=t,e.extend(t,e.FlickrModelRegistry,{name:this.name,remote:{read:function(t){return e.ModelFetchers["flickr-products-shipping"].run(t,this.appContext)},update:function(t,n){var r={},i=this;return Object.keys(this.attributes).forEach(function(e){r[e]=n[e]!==undefined?n[e].newVal:i.getValue(t,e)}),this.appContext.getModel("flickr-products-orders-models",t).then(function(t){return r.shippingType=t.getValue("shippingType"),e.ModelUpdaters["flickr-products-orders-setShippingAddress"].run(r,i.appContext)})},"delete":function(t){return e.ModelDeletors["flickr-products-orders-clearAddress"].run({orderId:this.getValue(t,"orderId")},this.appContext)}},isComplete:function(e){var t=Object.keys(this.attributes),n=["cacheBust","street2"],r=this.proxy(e);return t.every(function(e){return n.indexOf(e)<0&&r.getValue(e)===""?!1:!0})},attributes:{cacheBust:{},orderId:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}},firstName:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}},lastName:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}},street1:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}},street2:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}},city:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}},state:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){var n;return n=e.AttributeHelpers.coerceString(t),n.length===2&&(n=n.toUpperCase()),n}},postalCode:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}},countryCode:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)},defaultValue:"US"},phone:{getter:function(e){return e||""},validator:function(t){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)}}}})},"@VERSION@",{requires:["flickr-model-registry"],optional:["flickr-products-shipping-fetcher","flickr-products-orders-setShippingAddress-updater","flickr-products-orders-clearAddress-deletor"]});
YUI.add("products-credit-card-models",function(e){function t(e){t.superclass.constructor.call(this,e)}e.Models[this.name]=t,e.extend(t,e.FlickrModelRegistry,{name:this.name,remote:{"delete":function(t){return e.ModelDeletors["flickr-subscriptions-braintree-deletePaymentMethod-deletor"].run({id:t},this.appContext)},update:function(t,n){if("isDefault"in n)return e.ModelUpdaters["flickr-products-braintree-paymentDefault-updater"].run({id:t},this.appContext)}},attributes:{type:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},typeString:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t).toLowerCase()||undefined},defaultFn:function(e){return""}},last4:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},expirationMonth:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},expirationYear:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},firstName:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},lastName:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},isDefault:{validator:function(t,n){return e.AttributeHelpers.validateBoolean(t)},setter:function(t){return e.AttributeHelpers.coerceBoolean(t)||undefined},defaultFn:function(e){return!1}},isExpired:{validator:function(t,n){return e.AttributeHelpers.validateBoolean(t)},setter:function(t){return e.AttributeHelpers.coerceBoolean(t)||undefined},defaultValue:!1},subscriptionType:{validator:function(t,n){return e.AttributeHelpers.validateInteger(t)},setter:function(t){return e.AttributeHelpers.coerceInteger(t)||undefined},defaultFn:function(e){return-1}},address:{isModel:!0}}})},"@VERSION@",{requires:["flickr-subscriptions-braintree-deletePaymentMethod-deletor","flickr-products-braintree-paymentDefault-updater","products-address-models"]});
YUI.add("flickr-braintree-close-deletor",function(e,t){"use strict";function n(n,r){return r.callAPI("flickr.subscriptions.braintree.close",n).then(null,e.FetcherErrorLogger(t))}e.namespace("ModelDeletors")["flickr-braintree-close-deletor"]={run:n}},"@VERSION@",{requires:["flickr-promise"]});
YUI.add("flickr-subscriptions-changePlan-updater",function(e,t){"use strict";function n(n,r){return r.callAPI("flickr.subscriptions.changePlan",n).then(null,e.FetcherErrorLogger(t))}e.namespace("ModelUpdaters")["flickr-subscriptions-changePlan-updater"]={run:n}},"@VERSION@",{requires:["flickr-promise"]});
YUI.add("subscription-history-models",function(e){function t(e){t.superclass.constructor.call(this,e)}e.Models[this.name]=t,e.extend(t,e.FlickrModelRegistry,{name:this.name,remote:{update:function(t,n){return e.ModelUpdaters["flickr-subscriptions-changePlan-updater"].run({current_plan_type:n.type.prevVal,new_plan_type:n.type.newVal},this.appContext)},"delete":function(t,n){return e.ModelDeletors["flickr-braintree-close-deletor"].run({subscription_id:t},this.appContext)}},attributes:{startDate:{validator:function(t,n){return parseInt(t,10)>0?e.AttributeHelpers.validateDate(t):!0},setter:function(t){return parseInt(t,10)>0?e.AttributeHelpers.coerceDate(t)||undefined:undefined},serialize:function(e){return e.format("X")},deserialize:function(t){return e.moment(t,"X")},defaultFn:function(e){return}},nextBillingDate:{validator:function(t,n){return parseInt(t,10)>0?e.AttributeHelpers.validateDate(t):!0},setter:function(t){return parseInt(t,10)>0?e.AttributeHelpers.coerceDate(t)||undefined:undefined},serialize:function(e){return e.format("X")},deserialize:function(t){return e.moment(t,"X")},defaultFn:function(e){return}},effectiveEndDate:{validator:function(t,n){return parseInt(t,10)>0?e.AttributeHelpers.validateDate(t):!0},setter:function(t){return parseInt(t,10)>0?e.AttributeHelpers.coerceDate(t)||undefined:undefined},serialize:function(e){return e.format("X")},deserialize:function(t){return e.moment(t,"X")},defaultFn:function(e){return}},billingScheduleMonths:{validator:function(t,n){return e.AttributeHelpers.validateInteger(t)},setter:function(t){return e.AttributeHelpers.coerceInteger(t)||undefined},defaultFn:function(e){return 0}},type:{validator:function(t,n){return e.AttributeHelpers.validateInteger(t)},setter:function(t){return e.AttributeHelpers.coerceInteger(t)||undefined},defaultFn:function(e){return-1}},paymentMethodId:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},prettyName:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},prettyNameDuration:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},status:{validator:function(t,n){return e.AttributeHelpers.validateInteger(t)},setter:function(t){return e.AttributeHelpers.coerceInteger(t)||undefined},defaultFn:function(e){return-1}},amountBilled:{validator:function(t,n){return e.AttributeHelpers.validateFloat(t)},setter:function(t){return e.AttributeHelpers.coerceFloat(t)||undefined},defaultFn:function(e){return 0}},transactions:{}}})},"@VERSION@",{requires:["flickr-braintree-customerDetails-fetcher","flickr-braintree-close-deletor","flickr-subscriptions-changePlan-updater"]});
YUI.add("subscription-history-list-models",function(e){function t(e){t.superclass.constructor.call(this,e)}e.Models[this.name]=t,e.extend(t,e.FlickrModelRegistry,{name:this.name,remote:{read:function(t){return e.ModelFetchers["flickr-braintree-customerDetails-fetcher"].run(t,this.appContext)}},attributes:{subscriptions:{isListProxy:!0},oneTimePro:{}}})},"@VERSION@",{requires:["flickr-model-registry","flickr-promise","flickr-braintree-customerDetails-fetcher"]});
YUI.add("flickr-braintree-customerDetails-fetcher",function(e,t){"use strict";function n(e){var t={account_id:e.id};return t}function i(t,n,i){var s=t[0],o=t[1],u=t[2],a=t[3],f=t[4],l=t[5],c=t[6],h={},p={},d,v,m,g;s&&s.customerDetails&&(s.customerDetails.braintreePaymentMethods&&(m=s.customerDetails.braintreePaymentMethods),s.customerDetails.paypalPaymentMethods&&(g=s.customerDetails.paypalPaymentMethods)),v=s.customerDetails.subscriptions,d=s.customerDetails.addresses,d&&d instanceof Array&&d.forEach(function(e){var t={};t={firstName:e.firstName,lastName:e.lastName,street1:e.street1,street2:e.street2,city:e.city,state:e.state,postalCode:e.postalCode,countryCode:e.countryCode,phone:e.phone},f.exists(e.id)?f.setValues(e.id,t):(t.id=e.id,f.add(t))}),m&&m instanceof Array&&(h.cards=m.map(function(t){var n={};return n.type=t.cardType,n.typeString=r[t.cardType]||"",n.last4=t.paymentVendorCreditCardLastFour,n.expirationMonth=t.cardExpireMonth,n.expirationYear=t.cardExpireYear,n.isDefault=e.AttributeHelpers.coerceBoolean(t.isDefault),n.isExpired=e.moment(n.expirationYear+"-"+n.expirationMonth+"-01","YYYY-MM-DD").isBefore(),n.isDefault&&(h.defaultPaymentMethod=t.id),f.exists(t.billingAddressId)&&(n.address=f.proxy(t.billingAddressId)),u.exists(t.id)?(u.setValues(t.id,n),u.proxy(t.id)):(n.id=t.id,u.add(n))})),g&&(h.paypalPaymentMethods=g.map(function(t){var n={};return t.typeString="paypal",t.isDefault=e.AttributeHelpers.coerceBoolean(t.isDefault),t.email=unescape(t.email),t.isDefault&&(h.defaultPaymentMethod=t.id),n.dateCreate=t.dateCreate*1e3,n.dateUpdate=t.dateUpdate*1e3,n.firstName=t.firstName,n.lastName=t.lastName,n.email=t.email,n.isDefault=t.isDefault,n.typeString=t.typeString,a.exists(t.id)?(a.setValues(t.id,n),a.proxy(t.id)):(n.id=t.id,a.add(n))})),v&&v instanceof Array&&(p.subscriptions=v.map(function(t){var n={};t.status=parseInt(t.status,10),t.type=parseInt(t.type,10);if(t.status===2||t.status===7||t.status===12)u.exists(t.paymentMethodId)?(u.setValue(t.paymentMethodId,"subscriptionType",t.type),h.linkedPaymentMethod=t.paymentMethodId):a.exists(t.paymentMethodId)?(a.setValue(t.paymentMethodId,"subscriptionType",t.type),h.linkedPaymentMethod=t.paymentMethodId):e.Flog.info("Subscription tied to a payment method that does not exist.");return n.startDate=t.startDate*1e3,n.billingScheduleMonths=t.billingScheduleMonths,n.nextBillingDate=t.nextBillingDate*1e3,n.effectiveEndDate=t.effectiveEndDate*1e3,n.type=t.type,n.paymentMethodId=t.paymentMethodId,n.status=t.status,n.amountBilled=t.amountBilled,n.transactions=t.transactions,n.prettyName=t.planInfo.prettyName,n.prettyNameDuration=t.planInfo.prettyNameDuration,e.Array.each(n.transactions,function(t){t.formattedCreateDate=e.moment(t.dateCreate,"X").format("MMM Do, YYYY"),t.isRefund=!1,parseInt(t.transactionType,10)===3&&(t.isRefund=!0)}),c.exists(t.id)?(c.setValues(t.id,n),c.proxy(t.id)):(n.id=t.id,c.add(n))}),s.customerDetails.paymentHistory&&(p.oneTimePro=s.customerDetails.paymentHistory.proStatus)),l.exists(n.id)?l.setValues(n.id,p):(p.id=n.id,l.add(p)),o.exists(n.id)?o.setValues(n.id,h):(h.id=n.id,o.add(h))}function s(n,r){var i=this,s=this._processParams(n);return e.Promise.all([r.callAPI("flickr.subscriptions.braintree.getCustomerDetails",s,!0),r.getModelRegistry("products-payment-methods-list-models"),r.getModelRegistry("products-credit-card-models"),r.getModelRegistry("products-paypal-payment-models"),r.getModelRegistry("products-address-models"),r.getModelRegistry("subscription-history-list-models"),r.getModelRegistry("subscription-history-models")]).then(function(e){return i._processResponse(e,n,r)},e.PromiseCatcher(t))}var r={1:"Visa",2:"MasterCard",3:"Discover",4:"AmEx",5:"JCB"};e.namespace("ModelFetchers")["flickr-braintree-customerDetails-fetcher"]={run:s,_processParams:n,_processResponse:i}},"@VERSION@",{requires:["flickr-promise","api-helper","flog"],optional:["products-payment-methods-list-models","products-credit-card-models","subscription-history-models","subscription-history-list-models","products-address-models"]});
YUI.add("products-payment-methods-list-models",function(e){function t(e){t.superclass.constructor.call(this,e)}e.Models[this.name]=t,e.extend(t,e.FlickrModelRegistry,{name:this.name,remote:{read:function(t){return e.ModelFetchers["flickr-braintree-customerDetails-fetcher"].run(t,this.appContext)},create:function(t){return e.ModelCreators["flickr-braintree-createSubscription-create"].run(t,this.appContext)},update:function(t,n){if("defaultPaymentMethod"in n)return e.ModelUpdaters["flickr-products-braintree-paymentDefault-updater"].run({payment_method_id:n.defaultPaymentMethod.newVal},this.appContext);if("linkedPaymentMethod"in n)return e.ModelUpdaters["flickr-subscriptions-transferSubscriptions-updater"].run({old_payment_method_id:n.linkedPaymentMethod.prevVal,new_payment_method_id:n.linkedPaymentMethod.newVal},this.appContext)}},attributes:{cards:{isListProxy:!0},paypalPaymentMethods:{isListProxy:!0},defaultPaymentMethod:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return""}},linkedPaymentMethod:{validator:function(t,n){return e.AttributeHelpers.validateString(t)},setter:function(t){return e.AttributeHelpers.coerceString(t)||undefined},defaultFn:function(e){return"1"}}}})},"@VERSION@",{requires:["flickr-model-registry","flickr-promise","flickr-braintree-customerDetails-fetcher","flickr-braintree-createSubscription-creator","flickr-subscriptions-transferSubscriptions-updater","flickr-products-braintree-paymentDefault-updater"]});
YUI.add("account-menu-view",function(e){"use strict";e.namespace("Views")[this.name]=e.Base.create("account-menu-view",e.FlickrView,[],{langBundles:this.details.langBundles,initializer:function(e){return this},loadState:function(){var t=this,n=[],r=this.appContext.getViewer();return r.signedIn?(t.set("user",{signedIn:!0,csrf:this.appContext.auth.csrf?this.appContext.auth.csrf:""}),n.push(this.appContext.getModel("person-models",r.nsid).then(function(n){var r=n.toJSON();Object.keys(r.buddyicon||{}).forEach(function(e){r.buddyicon[e]||(r.buddyicon[e]=r.buddyicon["default"])}),t.set("user",e.merge(t.get("user"),r))})),n.push(t.appContext.getModel("person-profile-models",r.nsid).then(function(n){var r=n.toJSON();r.unreadMessages=parseInt(r.unreadMessages,10),r.storageUsed=parseInt(r.storageUsed,10),t.get("user").isPro&&!t.appContext.flipper.isFlipped("enable-new-pro")?t.get("user").hasAdfree||t.get("user").has1TB||t.get("user").has2TB?r.storageTotal=parseInt(r.storageTotal,10):r.storageTotal=-1:r.storageTotal=parseInt(r.storageTotal,10),t.set("user",e.merge(t.get("user"),r))})),e.Promise.all(n)):(t.set("user",{signedIn:!1}),e.Promise.resolve())},buildContainer:function(){var e=this.templates("account-menu")(this.toJSON());return this.setContainerHTML(e),this},toJSON:function(){var t=e.merge(this.get("user"));return parseInt(t.photoCount,10)>1?t.pluralPhotos=!0:t.pluralPhotos=!1,parseInt(t.photoCount,10)<1&&(t.photoCount=!1),t.photoCount>1e3&&(t.photoCount=Math.round(t.photoCount/1e3),t.oneK=!0),this.appContext.flipper.isFlipped("enable-new-pro")?t.hasUnlimitedStorage?t.storageTotalFormatted="":t.has1TB?t.storageTotalFormatted="1TB":t.has2TB?t.storageTotalFormatted="2TB":t.storageTotalFormatted=t.storageTotal<0?"":e.Handlebars.helpers.friendlyDataSize(t.storageTotal):t.storageTotalFormatted=t.storageTotal<0?"":e.Handlebars.helpers.friendlyDataSize(t.storageTotal),t.storageUsedPercentage=Math.floor(1e3*t.storageUsed/t.storageTotal)/10||"0.0",t.storageUsedFormatted=e.Handlebars.helpers.friendlyDataSize(t.storageUsed),t.barWidth=Math.floor(293*(t.storageUsedPercentage/100)),t.unreadMessages=t.unreadMessages>9999?"9999+":t.unreadMessages,{user:t,flippers:this.appContext.flipper.toJSON()}},activate:function(){setTimeout(function(){this.get("container").on("click",function(e){this.openMenu(e)},this)}.bind(this),350)},openMenu:function(t){var n=this.get("container"),r,i=this,s;return t.preventDefault(),this.fire("open"),this.accountMenuDialog||(this.appContext.flipper.isFlipped("enable-hover-account-menu")&&this.appContext.flipper.isFlipped("rebootify-group-discussions-list")?(r=this.templates("account-menu-card"),this.accountMenuDialog=new e.Views.FluidDroparound({appContext:this.appContext,dismissOnOverlayClick:!0,showDropArrow:!0,showOverlay:!1,width:322,height:"auto",observePageResize:!0,anchorElement:n.one(".c-account-menu"),htmlMessage:r({attrs:this.toJSON()}),positionFixed:!0})):r=this.templates("account-menu-dialog-styleguide"),this.accountMenuDialog||(this.accountMenuDialog=e.Views.dialog.getNewInstance("dialog-tooltip",{id:"AccountMenuDialog",positioning:!1,arrow:"topright",attrs:this.toJSON(),content:r,parent:this,anchorTo:n.one(".c-account-menu"),appendCurtainTo:n.ancestor(".global-nav-content")}),s=function(){i.accountMenuDialog.get("curtain").on("click",function(){i.closeMenu.bind(i)}),this.appContext.flipper.isFlipped("enable-new-pro")&&this.showGetProButton()},this.accountMenuDialog.on("show",function(){setTimeout(s,100)})),this.appContext.flipper.isFlipped("enable-new-pro")&&this.showGetProButton()),this.accountMenuDialog.show(),this.appContext.flipper.isFlipped("enable-new-pro")&&this.on("open",this.showGetProButton),this},closeMenu:function(e){e&&e.preventDefault(),this.accountMenuDialog&&this.accountMenuDialog.hide()},showGetProButton:function(){var t=!1,n=!1,r=[],i=this.appContext.getViewer();r.push(this.appContext.getModel("subscription-info-models",i.nsid).then(function(e){e.getValue("products").forEach(function(e){if(e.canPurchase){t=!0;return}}),!t&&this.accountMenuDialog.get("container").one(".upgrade")&&this.accountMenuDialog.get("container").one(".upgrade").remove(!0)}.bind(this))),r.push(this.appContext.getModel("subscription-history-list-models",i.nsid).then(function(e){e.getValue("subscriptions")&&(e.getValue("subscriptions").toJSON().forEach(function(e){if(e.effectiveEndDate||e.nextBillingDate)if(e.status===3||e.status===12){n=!0;return}}),this.get("user").hasUnlimitedStorage&&(n=!0))}.bind(this))),e.Promise.all(r).then(function(){var e=this.templates("account-menu-card-get-pro-button")({canPurchase:n?!1:t,canResubscribe:n});this.accountMenuDialog.get("container").one(".upgrade").replace(e),this.accountMenuDialog.get("container").one(".content").setStyles({height:"auto"})}.bind(this),function(t){e.Flog.warn("Error fetching model.",t)}.bind(this))},destructor:function(){this.accountMenuDialog&&(this.accountMenuDialog.destroy(),this.accountMenuDialog=null)}})},"@VERSION@",{requires:["flickr-view","account-menu-css","flickrui-css","dialog","account-menu-card-css","hermes-template-account-menu","hermes-template-account-menu-dialog","hermes-template-account-menu-dialog-styleguide","hermes-template-account-menu-card","hermes-template-account-menu-card-get-pro-button","fluid-droparound-view","subscription-history-list-models","flog"],optional:["person-models","person-profile-models"],langBundles:["account-menu","common"]});
YUI.add("hermes-lang-account-menu",function(e,t){e.Intl.add("hermes/account-menu","en-US",{SPACE_USED:["Using ","${percentage}","% of ","${total}"],SPACE_USED_STYLEGUIDE:["${percentage}","% used of ","${total}"],SPACE_USED_UNLIMITED:["Using ","${used}"," of your unlimited storage"],PHOTO_COUNT_MANY:[{type:"number",valueName:"num"}," photos"],PHOTO_COUNT_ONE:["One photo"],PHOTO_COUNT_NONE:["No photos"],PHOTO_COUNT_1K:[{type:"number",valueName:"num"},"k photos"],ADDMORESPACE:["Add more space"],GOADFREE:["Go Ad Free"],GOPRO:["Go Pro"],GETPRO:["Get Pro"],RESUBSCRIBE_TO_PRO:["Re-subscribe to Pro"],GREETING_CAPTION_SPANISH:["Now you know how to greet people in Spanish"],GREETING_CAPTION_GERMAN:["Now you know how to greet people in German"],GREETING_CAPTION_AUSTRALIAN:["Now you know how to greet people in Australian"],GREETING_CAPTION_DUTCH:["Now you know how to greet people in Dutch"],GREETING_CAPTION_ENGLISH:["Now you know how to greet people in English"],GREETING_CAPTION_ARABIC:["Now you know how to greet people in Arabic"],GREETING_CAPTION_FRENCH:["Now you know how to greet people in French"],GREETING_CAPTION_ITALIAN:["Now you know how to greet people in Italian"],GREETING_CAPTION_SWEDISH:["Now you know how to greet people in Swedish"],GREETING_CAPTION_HAWAIIAN:["Now you know how to greet people in Hawaiian"],GREETING_CAPTION_TAGALOG:["Now you know how to greet people in Tagalog"],GREETING_CAPTION_HEBREW:["Now you know how to greet people in Hebrew"],GREETING_CAPTION_HINDI:["Now you know how to greet people in Hindi"],GREETING_CAPTION_MANDARIN:["Now you know how to greet people in Mandarin"],GREETING_CAPTION_PORTUGUESE:["Now you know how to greet people in Portuguese"],GREETING_CAPTION_ALBANIAN:["Now you know how to greet people in Albanian"],GREETING_CAPTION_ESTONIAN:["Now you know how to greet people in Estonian"],GREETING_CAPTION_GREEK:["Now you know how to greet people in Greek"],GREETING_CAPTION_HUNGARIAN:["Now you know how to greet people in Hungarian"],GREETING_CAPTION_LINGALA:["Now you know how to greet people in Lingala"],GREETING_CAPTION_SWAHILI:["Now you know how to greet people in Swahili"],GREETING_CAPTION_TSHILUBA:["Now you know how to greet people in Tshiluba"],GREETING_CAPTION_TURKISH:["Now you know how to greet people in Turkish"],GREETING_CAPTION_BURMESE:["Now you know how to greet people in Burmese"],GREETING_CAPTION_ICELANDIC:["Now you know how to greet people in Icelandic"],GREETING_CAPTION_ZULU:["Now you know how to greet people in Zulu"],GREETING_CAPTION_KOREAN:["Now you know how to greet people in Korean"],GREETING_CAPTION_IRISH:["Now you know how to greet people in Irish"],GREETING_CAPTION_LATVIAN:["Now you know how to greet people in Latvian"],GREETING_CAPTION_BASQUE:["Now you know how to greet people in Basque"],GREETING_CAPTION_BENGALI:["Now you know how to greet people in Bengali"],GREETING_CAPTION_BULGARIAN:["Now you know how to greet people in Bulgarian"],GREETING_CAPTION_CROATIAN:["Now you know how to greet people in Croatian"],GREETING_CAPTION_CZECH:["Now you know how to greet people in Czech"],GREETING_CAPTION_DANISH:["Now you know how to greet people in Danish"],GREETING_CAPTION_FINNISH:["Now you know how to greet people in Finnish"],GREETING_CAPTION_HOPI:["Now you know how to greet people in Hopi"],GREETING_CAPTION_INDONESIAN:["Now you know how to greet people in Indonesian"],GREETING_CAPTION_KANNADA:["Now you know how to greet people in Kannada"],GREETING_CAPTION_KURDISH:["Now you know how to greet people in Kurdish"],GREETING_CAPTION_LITHUANIAN:["Now you know how to greet people in Lithuanian"],GREETING_CAPTION_MALAYSIAN:["Now you know how to greet people in Malaysian"],GREETING_CAPTION_NORWEGIAN:["Now you know how to greet people in Norwegian"],GREETING_CAPTION_POLISH:["Now you know how to greet people in Polish"],GREETING_CAPTION_ROMANIAN:["Now you know how to greet people in Romanian"],GREETING_CAPTION_RUSSIAN:["Now you know how to greet people in Russian"],GREETING_CAPTION_SERBIAN:["Now you know how to greet people in Serbian"],GREETING_CAPTION_SLOVAKIAN:["Now you know how to greet people in Slovakian"],GREETING_CAPTION_UKRAINIAN:["Now you know how to greet people in Ukrainian"],GREETING_CAPTION_VIETNAMESE:["Now you know how to greet people in Vietnamese"]})},"@VERSION@",{requires:["intl"]});
