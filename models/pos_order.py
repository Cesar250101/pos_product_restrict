# -*- coding: utf-8 -*-

from odoo import models,fields,api
from datetime import datetime, timedelta,date
import time
import datetime

class PosOrder(models.Model):
	_inherit = 'pos.order'


	@api.model
	def get_product(self, kwargs,orderline,client_name):
		result = {}
		res = []
		[res.append(x) for x in orderline if x not in res]
		today_date_start=date.today()-datetime.timedelta(days=6)		
		today_date_start = str(today_date_start) + ' 00:00:00'
		today_date_end = str(date.today()) + ' 23:59:59'
		st_date = datetime.datetime.strptime(today_date_start, '%Y-%m-%d %H:%M:%S')
		en_date = datetime.datetime.strptime(today_date_end, '%Y-%m-%d %H:%M:%S')
		pos_order = self.env['pos.order'].search([('date_order', '>=', st_date),('date_order', '<=', en_date),('partner_id.id', '=', kwargs)])
		for each_pos in pos_order:
			if each_pos.partner_id.id == kwargs:
				 result.update({'data': 'true','client': client_name})
			
		return result
					
	@api.model
	def get_deuda(self, kwargs,orderline,client_name):
		result = {}
		pos_order = self.env['account.invoice'].search([('state', '=', 'open'),('partner_id.id', '=', kwargs)])
		if pos_order:
			result.update({'data': 'true','client': client_name})
			
		return result
		
