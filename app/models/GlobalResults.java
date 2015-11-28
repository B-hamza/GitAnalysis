package models;

import java.util.List;

public class GlobalResults<T> {

	public int total_count;
	public boolean incomplete_results;
	public List<T> items;
	
	
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public boolean isIncomplete_results() {
		return incomplete_results;
	}
	public void setIncomplete_results(boolean incomplete_results) {
		this.incomplete_results = incomplete_results;
	}
	public List<T> getItems() {
		return items;
	}
	public void setItems(List<T> items) {
		this.items = items;
	}
	
	@Override
	public String toString(){
		return this.getTotal_count() + "; "+this.getItems();
	}
	
}
