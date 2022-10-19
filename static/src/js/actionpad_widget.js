odoo.define('pos_product_restrict.actionpad_widget' , function(require){
"use strict";

var rpc = require('web.rpc');
var models = require('point_of_sale.models');
var Screen = require('point_of_sale.screens');
var core = require('web.core');
var _t = core._t;

Screen.ActionpadWidget = Screen.ActionpadWidget.include({

		renderElement: function() {
        var self = this;
        this._super();
        this.$('.pay').click(function(){

            var order = self.pos.get_order();
            var product_list = [];
            for(var i=0; i<order.orderlines.models.length; i++) {
                var product_id = order.orderlines.models[i].product.id
                product_list.push(product_id)
                    
             }
            
            // rpc.query({
            //     model: 'pos.order',
            //     method: 'get_product',
            //     args : [order.attributes.client.id, product_list,order.attributes.client.name]
            // }).then(function(data){
            //     if (data['data'] === 'true'){
            //         self.gui.back();
            //         self.gui.show_popup('alert',{
            //             'title': _t('Warning'),
            //             'body':  _t('Ya existe un retiro dentro de los últimos 7 días para el cliente  ' + data["client"] + '.'),
            //         });

            //     }
            //     else{
            //             console.log('huuuuuuu')
            //          	var has_valid_product_lot = _.every(order.orderlines.models, function(line){
            //     		return line.has_valid_product_lot();
            // 			});
			//             if(!has_valid_product_lot){
			//                 self.gui.show_popup('confirm',{
			//                     'title': _t('Empty Serial/Lot Number'),
			//                     'body':  _t('One or more product(s) required serial/lot number.'),
			//                     confirm: function(){
			//                         self.gui.show_screen('payment');
			//                     },
			//                 });
			//             }
			//             else{
		    //             		self.gui.show_screen('payment');
		    //         		}
            //     	}
            // });
            
           
        });
        this.$('.set-customer').click(function(){
            self.gui.show_screen('clientlist');
        });
    },

	});

	
});