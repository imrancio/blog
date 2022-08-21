---
title: 'Recursion vs Iteration'
date: 2022-05-23
description: 'A comparison of two approaches when coding solutions to algorithms in various programming languages'
tags:
  [
		'algorithms',
		'JavaScript',
		'python',
    'software',
  ]
---

## Background

For the longest time I've been avoiding recursive functions like the black plague. My justification had been that all recursive code will eventually have to deal with the limitation of running out of memory that can be allocated for the call stack.

> Recursion is a method of solving computational problems where the solution depends on solving smaller versions of the same problem. In a programming context, it may refer to a function that calls itself, either directly or indirectly, in the definition of the function.

## Example problem

To illustrate this better with an example, lets define a problem `fib(n)`, where `n` can be any positive integer (from 0 up to some reasonable threshold). Given such a value of `n`, the function `fib(n)` should return the fibonacci number at the index position `n`.

> The fibonacci number sequence is one where every number is the sum of the previous two numbers, such that the first two numbers are 1. The following numbers are the first few in the sequence:

| n      | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| fib(n) | 1   | 1   | 2   | 3   | 5   | 8   | 13  | 21  |

### Recursive solution - Naive

So `fib(0) = 1`, `fib(3) = 3`, and `fib(8) = 34`. Given such a problem, I could define a recursive javascript function as follows:

```js
// highlight-start
function fib(n) {
	// highlight-end
	if (n === 0 || n === 1) {
		return 1;
	}
	// highlight-start
	return fib(n - 1) + fib(n - 2);
	// highlight-end
}
```

Or define a recursive python function:

```python
# highlight-start
def fib(n):
	# highlight-end
	if n == 0 or n == 1:
		return 1
	# highlight-start
	return fib(n - 1) + fib(n - 2)
	# highlight-end
```

As you can see in the above highlighted code, we call the `fib(n)` function recursively in the definition of the function `fib(n)`. The problem with this solution becomes apparent when we work through the recursive calls by hand for `fib(6)`.

![fibonacci-recursive-tree](https://files.imranc.io/static/blog/posts/recursion-vs-iteration/fibonacci-recursive-tree.jpeg 'Fibonacci recursive tree diagram')

The diagram above is a binary tree of all the recursive calls to the `fib(n)` function that will be made. Note that some of the sub-solutions will be computed multiple times in different branches of the tree, such as `fib(2)`, `fib(3)`, and `fib(4)`. Such redundant computation wastefully increases memory and CPU usage.

> A _binary tree_ is a subset of a tree data structure where every node has at most two child nodes.

### Recursive solution - Memoised

**Memoisation** is a technique that we can apply to the naive solution to solve this redundant computation problem. Essentially, it involves storing solutions to our problems as we solve them in a _memo_. Before computing any solution, we check the memo to see if we already solved it before. If so, then we use the stored solution, else we compute the solution and store it in the memo.

Consider the following javascript code:

```js
function fib(n, memo = {}) {
	if (n === 0 || n === 1) {
		return 1;
	} else if (memo[n] !== undefined) {
		return memo[n];
	} else {
		memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
		return memo[n];
	}
}
```

Or the equivalent python code:

```python
def fib(n, memo = {}):
	if n == 0 or n == 1:
		return 1
	elif n in memo:
		return memo[n]
	else:
		memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
		return memo[n]
```

In this version, we still have a recursive function that calls itself. But it takes a second argument `memo`, which is initialised to an empty object `{}` by default. This `memo` is then used by all recursive function calls to store and read solutions to avoid recomputing solved solutions.

Now even with the memo optimisation, this function will be very inefficient for a large value of `n`. That's because the number of recursive calls needed to solve `fib(n)` scales with the value of `n`. In other words, the larger the value of `n`, the more recursive function calls that will need to be made to solve `fib(n)`.

For this version of the code, I can run `fib(9)`, `fib(99)`, `fib(999)` on my browser console and get the correct result very quickly. But for `fib(9999)`, it fails with an error. The error complains:

```
Maximum call stack size exceeded
```

It's the same result when I run `fib(9999)` with the python version of the code in a python runtime:

```
maximum recursion depth exceeded in comparison
```

So what is happening? Each recursive function call needs some resources allocated on the call stack to execute the function. And after a point, you may either exhaust all your resources or hit a limit set by your code's runtime. Simply put, there's not enough resources that can be allocated to load all your recursive function calls and execute them in a python or nodejs runtime.

## Iterative solution

Now consider the following javascript code:

```js
function fib(n) {
	let a = 0;
	let b = 1;
	for (let i = 0; i < n; i++) {
		const c = a + b;
		a = b;
		b = c;
	}
	return b;
}
```

This solution is more optimal than the memoised recursive one because:

1. We only keep track of 4 variables at most. Mainly the current 2 fibonacci numbers `a` and `b`, the index position `i` and the sum `c` of `a` and `b`.

2. We don't need to store the memo of all solved solutions as we can iteratively compute the value of `fib(n)` in pairs based on the current values in the loop.

3. We do not need to keep spawning new recursive functions in the call stack as the value of `n` increases

4. The time taken to calculate `fib(n)` scales linearly with the size of `n`

Running this version of the code in my browser console, I get a result back for `fib(9999)` fairly quickly:

```
Infinity
```

That's probably not the real value of `fib(9999)`. It's more likely that the result of `fib(9999)` is larger than what the maximum safe integer value is in your nodejs runtime. So it's instead represented as `Infinity`.

So let's try to run the same code in a python runtime, like so:

```python
def fib(n):
	a, b = 0, 1
	for i in range(n):
		c = a + b
		a = b
		b = c
	return b
```

Running `fib(9999)` after defining the above function in a python runtime, I get back the correct result. It is a large integer value with 2090 digits.
