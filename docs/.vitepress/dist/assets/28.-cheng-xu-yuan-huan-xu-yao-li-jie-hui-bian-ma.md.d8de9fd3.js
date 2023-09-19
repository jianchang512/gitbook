import{_ as s,o as a,c as e,Q as n}from"./chunks/framework.bf97371d.js";const v=JSON.parse('{"title":"28.程序员还需要理解汇编吗？","description":"","frontmatter":{},"headers":[],"relativePath":"28.-cheng-xu-yuan-huan-xu-yao-li-jie-hui-bian-ma.md","filePath":"28.-cheng-xu-yuan-huan-xu-yao-li-jie-hui-bian-ma.md"}'),p={name:"28.-cheng-xu-yuan-huan-xu-yao-li-jie-hui-bian-ma.md"},l=n(`<h1 id="_28-程序员还需要理解汇编吗" tabindex="-1">28.程序员还需要理解汇编吗？ <a class="header-anchor" href="#_28-程序员还需要理解汇编吗" aria-label="Permalink to &quot;28.程序员还需要理解汇编吗？&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">写代码不知道究竟写了什么，就像手持火把穿过炸药厂，你可能会活下来，但这纯属幸运。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">写代码不知道究竟写了什么，就像手持火把穿过炸药厂，你可能会活下来，但这纯属幸运。</span></span></code></pre></div><p>大家好，我是小风哥。 </p><p>不管一个程序多么简单，只有几行代码，比如你写的helloworld程序，也不管一个程序多么复杂，几千万几亿行代码，比如浏览器程序或者干脆操作系统，最终，都是要转换为一条条极其简单的机器指令被CPU运行，小风哥词汇量匮乏，只能在这里给出“神奇”二字。 </p><p>当程序员使用C/C++、Java、Python等语言时，这些编程语言对我们屏蔽了机器指令级别的差异，很显然，这更加高效，因为你一行用高级语言的代码可能会被编译器翻译为几行甚至十几行机器指令，显然使用汇编语言的生产力是远不及高级语言的，而且现代编译器足够智能，其生成的指令足以媲美一个汇编熟练工手写的汇编代码，而且最棒的是高级语言编写的代码可以跨平台运行，而机器指令则是和具体平台绑定一起的。 </p><p>所以，快2022年了，程序员还需要理解汇编吗？ </p><p>我的答案是，<strong>大部分人都不需要，除了那些编程高手、黑客，还有编写操作系统、编译器、驱动的程序员，以及对底层好奇的同学们</strong>。</p><p>这里的理解不是说要手写汇编，而是仅仅看懂就好，那理解了汇编语言有什么好处吗？ </p><p>如果你想真正弄清楚CPU在细节层面是如何工作的，那么理解汇编语言是第一步。 </p><p>汇编语言可以告诉你函数调用是如何实现的，当你使用if for while等底层到底发生了什么。 </p><p>理解了汇编语言，当使用多线程编程时你会深刻的理解多线程将会怎样访问共享数据，为什么访问共享数据一次只能由一个线程来操作。 </p><p>如果你在学习C语言或者挣扎在指针的泥潭里，那么你可以看看汇编，比如有这样一段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">void swap(int* a, int* b) {</span></span>
<span class="line"><span style="color:#e1e4e8;"> int t = *a;</span></span>
<span class="line"><span style="color:#e1e4e8;"> *a = *b;</span></span>
<span class="line"><span style="color:#e1e4e8;"> *b = t;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">void swap(int* a, int* b) {</span></span>
<span class="line"><span style="color:#24292e;"> int t = *a;</span></span>
<span class="line"><span style="color:#24292e;"> *a = *b;</span></span>
<span class="line"><span style="color:#24292e;"> *b = t;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>这是C语言中非常简单整数交换代码，这里涉及到了指针操作，那么这段代码生成的汇编指令是什么样的呢？ </p><p>我们使用命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">gcc -S -Os test.c</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">gcc -S -Os test.c</span></span></code></pre></div><p>来查看生成的汇编指令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">swap:</span></span>
<span class="line"><span style="color:#e1e4e8;"> movl (%rdi), %eax</span></span>
<span class="line"><span style="color:#e1e4e8;"> movl (%rsi), %edx</span></span>
<span class="line"><span style="color:#e1e4e8;"> movl %edx, (%rdi)</span></span>
<span class="line"><span style="color:#e1e4e8;"> movl %eax, (%rsi)</span></span>
<span class="line"><span style="color:#e1e4e8;"> ret</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">swap:</span></span>
<span class="line"><span style="color:#24292e;"> movl (%rdi), %eax</span></span>
<span class="line"><span style="color:#24292e;"> movl (%rsi), %edx</span></span>
<span class="line"><span style="color:#24292e;"> movl %edx, (%rdi)</span></span>
<span class="line"><span style="color:#24292e;"> movl %eax, (%rsi)</span></span>
<span class="line"><span style="color:#24292e;"> ret</span></span></code></pre></div><p>寄存器rdi中保存的就是指针a，寄存器rsi保存的是指针b，(%rdi)的意思将寄存器rdi中的值作为内存地址并读取该地址中的值， “movl (%rdi), %eax”的意思就是将a指向的值放到寄存器eax，剩下的就简单了，从这里可以看出C语言中的所谓指针无非就是一个内存地址或者更通俗一点就好比门牌号。 </p><p>哦，对了，很多同学买来当做镇宅之宝的《计算机程序设计与艺术》，这本书中的算法可是用汇编来讲解的，高级编程语言这层外衣就像当季流行的潮款，一茬又一茬，汇编语言就朴实无华的多了，这几乎不会存在过时的风险。 </p><p>但这篇文章绝不是鼓励你一股脑去学汇编，学习任何东西都要讲究目的，搞清楚目的再去学，否则大概率就是在浪费时间，本篇介绍了一些汇编语言的好处，但不能否认这些可能对你来说不是必须的，但你如果你对底层好奇，那么汇编语言可以解答你很多的疑惑，小风哥对汇编其实也不是很了解，早些年学到的已经完整还给老师了，只不过最近几年感觉汇编的确能解答一些问题，如果你也有同感，不妨去了解一下。</p>`,21),o=[l];function c(i,t,r,d,h,u){return a(),e("div",null,o)}const g=s(p,[["render",c]]);export{v as __pageData,g as default};
