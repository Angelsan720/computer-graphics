#include "stdio.h"

int fib(int i){
	if (i > 1){
		return (fib(i-1) + fib(i-2));
	}
		return(1);
	}

int main(){
	printf("%i",fib(40));
}