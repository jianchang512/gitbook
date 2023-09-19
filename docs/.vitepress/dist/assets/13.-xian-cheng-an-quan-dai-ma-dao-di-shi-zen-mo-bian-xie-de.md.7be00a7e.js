import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.bf97371d.js";const e="/assets/13_1.976e0003.jpg",l="/assets/13_2.2ead8008.jpg",t="/assets/13_3.f303df3a.jpg",o="/assets/13_4.e153f6ea.jpg",c="/assets/13_5.02c4e3f1.jpg",i="/assets/13_6.d29dc232.jpg",r="/assets/13_7.377478af.jpg",d="/assets/13_8.baa04ce2.jpg",u="/assets/13_9.86d8c028.jpg",x=JSON.parse('{"title":"13.线程安全代码到底是怎么编写的？","description":"","frontmatter":{},"headers":[],"relativePath":"13.-xian-cheng-an-quan-dai-ma-dao-di-shi-zen-mo-bian-xie-de.md","filePath":"13.-xian-cheng-an-quan-dai-ma-dao-di-shi-zen-mo-bian-xie-de.md"}'),g={name:"13.-xian-cheng-an-quan-dai-ma-dao-di-shi-zen-mo-bian-xie-de.md"},h=p('<h1 id="_13-线程安全代码到底是怎么编写的" tabindex="-1">13.线程安全代码到底是怎么编写的？ <a class="header-anchor" href="#_13-线程安全代码到底是怎么编写的" aria-label="Permalink to &quot;13.线程安全代码到底是怎么编写的？&quot;">​</a></h1><p>相信有很多同学在面对多线程代码时都会望而生畏，认为多线程代码就像一头难以驯服的怪兽，你制服不了这头怪兽它就会反过来吞噬你。 </p><p>夸张了哈，总之，多线程程序有时就像一潭淤泥，走不进去退不出来。 </p><p>可这是为什么呢？<strong>为什么多线程代码如此难以正确编写呢</strong>？</p><h3 id="从根源上思考" tabindex="-1"><strong>从根源上思考</strong> <a class="header-anchor" href="#从根源上思考" aria-label="Permalink to &quot;**从根源上思考**&quot;">​</a></h3><p>关于这个问题，本质上是有一个词语你没有透彻理解，这个词就是所谓的<strong>线程安全</strong>，thread safe。 </p><p><strong>如果你不能理解线程安全，那么给你再多的方案也是无用武之地</strong>。</p><p> 接下来我们了解一下什么是线程安全，怎样才能做到线程安全。 </p><p>这些问题解答后，多线程这头大怪兽自然就会变成温顺的小猫咪。</p><p><strong>关你什么屁事</strong></p><p>生活中我们口头上经常说的一句话就是“关你屁事”，大家想一想，为什么我们的屁事不关别人？ </p><p>原因很简单，这是我的<strong>私事</strong>啊！我的衣服、我的电脑，我的手机、我的车子、我的别墅以及私人泳池 (可以没有，但不妨碍想象)，我想怎么处理就怎么处理，妨碍不到别人，只属于我一个人的东西以及 事情当然不关别人，即使是屁事也不关别人。</p><p><img src="'+e+'" alt=""></p><p>我们在自己家里想吃什么吃什么，想去厕所就去厕所！因为这些都是我私有的，只有我自己使用。 那么什么时候会和其它人有交集呢？ </p><p>答案就是<strong>公共场所</strong>。 </p><p>在公共场所下你不能像在自己家里一样想去哪就去哪，想什么时候去厕所就去厕所，为什么呢？原因很简单，因为公共场所下的饭馆、卫生间不是你家的，这是公共资源，大家都可以使用的<strong>公共资源</strong>。 </p><p>如果你想去饭馆、去公共卫生间那么就必须遵守规则，这个规则就是<strong>排队</strong>，只有前一个人用完公共资源后下一个人才可以使用，而且<strong>不能同时使用，想使用就必须排队等待</strong>。 </p><p>上面这段话道理足够简单吧。 </p><p>如果你能理解这段话，那么驯服多线程这头小怪兽就不在话下。</p><p><strong>维护公共场所秩序</strong></p><p>如果把你自己理解为线程的话，那么在你自己家里使用私有资源就是所谓的线程安全，原因很简单， 因为<strong>你随便怎么折腾自己的东西(资源)都不会妨碍到别人</strong>；</p><p>但到公共场所浪的话就不一样了，在公共场所使用的是公共资源，这时你就不能像在自己家里一样想怎么用就怎么用想什么时候用就什么时候用，公共场所必须有相应规则，这里的规则通常是排队，只有这样公共场所的秩序才不会被破坏，线程以某种不妨碍到其它线程的秩序使用共享资源就能实现线程安全。 </p><p>因此我们可以看到，这里有两种情况：</p><ul><li>线程私有资源，没有线程安全问题</li><li>共享资源，线程间以某种秩序使用共享资源也能实现线程安全。</li></ul><p>本文都是围绕着上述两个核心点来讲解的，现在我们就可以正式的聊聊编程中的线程安全了。</p><h3 id="什么是线程安全" tabindex="-1"><strong>什么是线程安全</strong> <a class="header-anchor" href="#什么是线程安全" aria-label="Permalink to &quot;**什么是线程安全**&quot;">​</a></h3><p>我们说一段代码是线程安全的，<strong>当且仅当我们在多个线程中同时且多次调用的这段代码都能给出正确的结果</strong>，这样的代码我们才说是线程安全代码，Thread Safety，否则就不是线程安全代码，threadunsafe。 </p><p>非线程安全的代码其运行结果是由掷骰子决定的。</p><p><img src="'+l+`" alt=""></p><p>怎么样，线程安全的定义很简单吧，也就是说你的代码不管是在单个线程还是多个线程中被执行都应该能给出正确的运行结果，这样的代码是不会出现多线程问题的，就像下面这段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int func() {</span></span>
<span class="line"><span style="color:#e1e4e8;">   int a = 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">   int b = 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">   return a + b;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int func() {</span></span>
<span class="line"><span style="color:#24292e;">   int a = 1;</span></span>
<span class="line"><span style="color:#24292e;">   int b = 1;</span></span>
<span class="line"><span style="color:#24292e;">   return a + b;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>对于这样段代码，<strong>无论你用多少线程同时调用、怎么调用、什么时候调用都会返回2</strong>，这段代码就是线程安全的。 </p><p>那么我们该怎样写出线程安全的代码呢？ </p><p>要回答这个问题，我们需要知道我们的代码什么时候呆在自己家里使用私有资源，什么时候去公共场所使用公共资源，也就是说你需要识别线程的私有资源和共享资源都有哪些，这是解决线程安全问题的<strong>核心</strong>所在。</p><p><img src="`+t+'" alt=""></p><h3 id="线程私有资源" tabindex="-1"><strong>线程私有资源</strong> <a class="header-anchor" href="#线程私有资源" aria-label="Permalink to &quot;**线程私有资源**&quot;">​</a></h3><p>线程都有哪些私有资源呢？啊哈，我们在上一篇《线程到底共享了哪些进程资源》中详细讲解了这个问题。</p><p>线程运行的本质其实就是函数的执行，函数的执行总会有一个源头，这个源头就是所谓的入口函数，CPU从入口函数开始执行从而形成一个执行流，只不过我们人为的给执行流起一个名字，这个名字就叫线程。</p><p>既然线程运行的本质就是函数的执行，那么函数运行时信息都保存在哪里呢？ </p><p>答案就是栈区，每个线程都有一个私有的栈区，因此在栈上分配的局部变量就是线程私有的，无论我 们怎样使用这些局部变量都不管其它线程屁事。</p><p><img src="'+o+'" alt=""></p><p><strong>线程私有的栈区就是线程自己家。</strong></p><h3 id="线程间共享数据" tabindex="-1"><strong>线程间共享数据</strong> <a class="header-anchor" href="#线程间共享数据" aria-label="Permalink to &quot;**线程间共享数据**&quot;">​</a></h3><p>除了上一节提到的剩下的区域就是公共场合了，这包括：</p><ul><li>用于动态分配内存的堆区，我们用C/C++中的malloc或者new就是在堆区上申请的内存</li><li>全局区，这里存放的就是全局变量</li><li>文件，我们知道线程是共享进程打开的文件</li></ul><p><img src="'+c+`" alt=""></p><p>有的同学可能说，等等，在上一篇文章不是说还有代码区和动态链接库吗？ </p><p>要知道这两个区域是不能被修改的，也就是说这两个区域是只读的，因此多个线程使用是没有问题 的。 </p><p>在刚才我们提到的堆区、数据区以及文件，这些就是所有的线程都可以共享的资源，也就是公共场 所，线程在这些公共场所就不能随便浪了。 </p><p>线程使用这些共享资源必须要遵守秩序，这个秩序的核心就是<strong>对共享资源的使用不能妨碍到其它线程</strong>，无论你使用各种锁也好、信号量也罢，其目的都是在维护公共场所的秩序。 </p><p>知道了哪些是线程私有的，哪些是线程间共享的，接下来就简单了。 </p><p>值得注意的是，关于线程安全的一切问题全部围绕着线程私有数据与线程共享数据来处理，<strong>抓住了线 程私有资源和共享资源这个主要矛盾也就抓住了解决线程安全问题的核心</strong>。 </p><p>接下来我们看下在各种情况下该怎样实现线程安全，依然以C/C++代码为例，但是这里讲解的方法适用于任何语言，请放心，这些代码足够简单。</p><h3 id="只使用线程私有资源" tabindex="-1"><strong>只使用线程私有资源</strong> <a class="header-anchor" href="#只使用线程私有资源" aria-label="Permalink to &quot;**只使用线程私有资源**&quot;">​</a></h3><p>我们来看这段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int func() { </span></span>
<span class="line"><span style="color:#e1e4e8;">    int a = 1; </span></span>
<span class="line"><span style="color:#e1e4e8;">    int b = 1; </span></span>
<span class="line"><span style="color:#e1e4e8;">    return a + b;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int func() { </span></span>
<span class="line"><span style="color:#24292e;">    int a = 1; </span></span>
<span class="line"><span style="color:#24292e;">    int b = 1; </span></span>
<span class="line"><span style="color:#24292e;">    return a + b;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>这段代码在前面提到过，<strong>无论你在多少个线程中怎么调用什么时候调用，func函数都会确定的返回2</strong>，该函数不依赖任何全局变量，不依赖任何函数参数，且使用的局部变量都是线程私有资源，这样的代码也被称为无状态函数，stateless，很显然这样的代码是线程安全的。</p><p><img src="`+i+`" alt=""></p><p>这样的代码请放心大胆的在多线程中使用，不会有任何问题。 </p><p>有的同学可能会说，那如果我们还是使用线程私有资源，但是传入函数参数呢？</p><h3 id="线程私有资源-函数参数" tabindex="-1"><strong>线程私有资源+函数参数</strong> <a class="header-anchor" href="#线程私有资源-函数参数" aria-label="Permalink to &quot;**线程私有资源+函数参数**&quot;">​</a></h3><p>这样的代码是线程安全的吗？自己先想一想这个问题。 </p><p>答案是<strong>it depends</strong>，也就是要看情况。看什么情况呢？</p><p><strong>1，按值传参</strong></p><p>如果你传入的参数的方式是<strong>按值传入</strong>，那么没有问题，代码依然是线程安全的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int func(int num) { num++; return num;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int func(int num) { num++; return num;}</span></span></code></pre></div><p>这这段代码无论在多少个线程中调用怎么调用什么时候调用都会正确返回参数加1后的值。 </p><p>原因很简单，按值传入的这些参数是线程私有资源。</p><p><strong>2，按引用传参</strong></p><p>但如果是按引用传入参数，那么情况就不一样了：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int func(int* num) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  ++(*num);</span></span>
<span class="line"><span style="color:#e1e4e8;">  return *num;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int func(int* num) {</span></span>
<span class="line"><span style="color:#24292e;">  ++(*num);</span></span>
<span class="line"><span style="color:#24292e;">  return *num;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>如果调用该函数的线程传入的参数是线程私有资源，那么该函数依然是线程安全的，能正确的返回参数加1后的值。 </p><p>但如果传入的参数是全局变量，就像这样：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int global_num = 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">int func(int* num) { ++(*num); return *num;}</span></span>
<span class="line"><span style="color:#e1e4e8;">// 线程1void thread1() { func(&amp;global_num);}</span></span>
<span class="line"><span style="color:#e1e4e8;">// 线程2void thread1() { func(&amp;global_num);}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int global_num = 1;</span></span>
<span class="line"><span style="color:#24292e;">int func(int* num) { ++(*num); return *num;}</span></span>
<span class="line"><span style="color:#24292e;">// 线程1void thread1() { func(&amp;global_num);}</span></span>
<span class="line"><span style="color:#24292e;">// 线程2void thread1() { func(&amp;global_num);}</span></span></code></pre></div><p>那此时func函数将不再是线程安全代码，因为传入的参数指向了全局变量，这个全局变量是所有线程可共享资源，这种情况下如果不改变全局变量的使用方式，那么对该全局变量的加1操作必须施加某种秩序，比如加锁。</p><p><img src="`+r+`" alt=""></p><p>有的同学可能会说如果我传入的不是全局变量的指针(引用)是不是就不会有问题了？ </p><p>答案依然是it depends，要看情况。 </p><p>即便我们传入的参数是在堆上(heap)用malloc或new出来的，依然可能会有问题，为什么？ </p><p>答案很简单，因为<strong>堆上的资源也是所有线程可共享的</strong>。 </p><p>假如有两个线程调用func函数时传入的指针(引用)指向了同一个堆上的变量，那么该变量就变成了这两个线程的<strong>共享资源</strong>，在这种情况下func函数依然不是线程安全的。 </p><p>改进也很简单，那就是每个线程调用func函数传入一个独属于该线程的资源地址，这样各个线程就不会妨碍到对方了，因此，<strong>写出线程安全代码的一大原则就是能用线程私有的资源就用私有资源，线程之间尽最大可能不去使用共享资源</strong>。 </p><p>如果线程不得已要使用全局资源呢？</p><h3 id="使用全局资源" tabindex="-1"><strong>使用全局资源</strong> <a class="header-anchor" href="#使用全局资源" aria-label="Permalink to &quot;**使用全局资源**&quot;">​</a></h3><p>使用全局资源就一定不是线程安全代码吗？</p><p>答案还是。。有的同学可能已经猜到了，答案依然是要看情况。</p><p>如果使用的全局资源只在程序运行时初始化一次，此后所有代码对其使用都是只读的，那么没有问题，就像这样：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int global_num = 100; //初始化一次，此后没有其它代码修改其值</span></span>
<span class="line"><span style="color:#e1e4e8;">int func() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return global_num;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int global_num = 100; //初始化一次，此后没有其它代码修改其值</span></span>
<span class="line"><span style="color:#24292e;">int func() {</span></span>
<span class="line"><span style="color:#24292e;">    return global_num;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>我们看到，即使func函数使用了全局变量，但该全局变量只在运行前初始化一次，此后的代码都不会对其进行修改，那么func函数依然是线程安全的。 </p><p>但，如果我们简单修改一下func：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int global_num = 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">int func() { ++global_num; return global_num;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int global_num = 100;</span></span>
<span class="line"><span style="color:#24292e;">int func() { ++global_num; return global_num;}</span></span></code></pre></div><p>这时，func函数就不再是线程安全的了，对全局变量的修改必须加锁保护。</p><h3 id="线程局部存储" tabindex="-1"><strong>线程局部存储</strong> <a class="header-anchor" href="#线程局部存储" aria-label="Permalink to &quot;**线程局部存储**&quot;">​</a></h3><p>接下来我们再对上述func函数简单修改：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">__thread int global_num = 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">int func() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ++global_num;</span></span>
<span class="line"><span style="color:#e1e4e8;">    return global_num;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">__thread int global_num = 100;</span></span>
<span class="line"><span style="color:#24292e;">int func() {</span></span>
<span class="line"><span style="color:#24292e;">    ++global_num;</span></span>
<span class="line"><span style="color:#24292e;">    return global_num;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>我们看到全局变量global_num前加了关键词__thread修饰，这时，func代码就是又是线程安全的了。 </p><p>为什么呢？ </p><p>其实在上一篇文章中我们讲过，被__thread关键词修饰过的变量放在了线程私有存储中，Thread Local Storage，什么意思呢？ </p><p>意思是说这个变量是线程私有的全局变量：</p><ul><li>global_num是全局变量 </li><li>global_num是线程私有的</li></ul><p><img src="`+d+'" alt=""></p><p>各个线程对global_num的修改不会影响到其它线程，因为是线程私有资源，因此func函数是线程安 全的。 </p><p>说完了局部变量、全局变量、函数参数，那么接下来就到函数返回值了。</p><h3 id="函数返回值" tabindex="-1"><strong>函数返回值</strong> <a class="header-anchor" href="#函数返回值" aria-label="Permalink to &quot;**函数返回值**&quot;">​</a></h3><p>这里也有两种情况，一种是函数返回的是值；另一种返回对变量的引用。</p><p><strong>1，返回的是值</strong></p><p>我们来看这样一段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int func() { int a = 100; return a;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int func() { int a = 100; return a;}</span></span></code></pre></div><p>毫无疑问，这段代码是线程安全的，无论我们怎样调用该函数都会返回确定的值100。</p><p><strong>2，返回的是引用</strong></p><p>我们把上述代码简单的改一改：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int* func() { static int a = 100; return &amp;a;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int* func() { static int a = 100; return &amp;a;}</span></span></code></pre></div><p>如果我们在多线程中调用这样的函数，那么接下来等着你的可能就是难以调试的bug以及漫漫的加班长夜。。</p><p><img src="'+u+`" alt=""></p><p>很显然，这不是线程安全代码，产生bug的原因也很简单，你在使用该变量前其值可能已经被其它线程修改了。因为该函数使用了一个静态全局变量，只要能拿到该变量的地址那么所有线程都可以修改该变量的值，因为这是线程间的共享资源，不到万不得已不要写出上述代码，除非老板拿刀架在你脖子上。 </p><p>但是，请注意，<strong>有一个特例</strong>，这种使用方法可以用来实现设计模式中的<strong>单例模式</strong>，就像这样：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">class S {</span></span>
<span class="line"><span style="color:#e1e4e8;"> public:</span></span>
<span class="line"><span style="color:#e1e4e8;"> static S&amp; getInstance() {</span></span>
<span class="line"><span style="color:#e1e4e8;">   static S instance;</span></span>
<span class="line"><span style="color:#e1e4e8;">   return instance;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;"> private: S() {} // 其它省略</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">class S {</span></span>
<span class="line"><span style="color:#24292e;"> public:</span></span>
<span class="line"><span style="color:#24292e;"> static S&amp; getInstance() {</span></span>
<span class="line"><span style="color:#24292e;">   static S instance;</span></span>
<span class="line"><span style="color:#24292e;">   return instance;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;"> private: S() {} // 其它省略</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>为什么呢？ </p><p>因为无论我们调用多少次func函数，static局部变量都只会被初始化一次，这种特性可以很方便的让我们实现单例模式。 </p><p>最后让我们来看下这种情况，那就是如果我们调用一个非线程安全的函数，那么我们的函数是线程安全的吗？</p><h3 id="调用非线程安全代码" tabindex="-1"><strong>调用非线程安全代码</strong> <a class="header-anchor" href="#调用非线程安全代码" aria-label="Permalink to &quot;**调用非线程安全代码**&amp;#x20;&quot;">​</a></h3><p>假如一个函数A调用另一个函数B，但B不是线程安全，那么函数A是线程安全的吗？ </p><p>答案依然是，要看情况。 </p><p>我们看下这样一段代码，这段代码在之前讲解过：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int global_num = 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">int func() { ++global_num; return global_num;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int global_num = 0;</span></span>
<span class="line"><span style="color:#24292e;">int func() { ++global_num; return global_num;}</span></span></code></pre></div><p>我们认为func函数是非线程安全的，因为func函数使用了全局变量并对其进行了修改，但如果我们这样调用func函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int funcA() {</span></span>
<span class="line"><span style="color:#e1e4e8;"> mutex l;</span></span>
<span class="line"><span style="color:#e1e4e8;"> l.lock();</span></span>
<span class="line"><span style="color:#e1e4e8;"> func();</span></span>
<span class="line"><span style="color:#e1e4e8;"> l.unlock();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int funcA() {</span></span>
<span class="line"><span style="color:#24292e;"> mutex l;</span></span>
<span class="line"><span style="color:#24292e;"> l.lock();</span></span>
<span class="line"><span style="color:#24292e;"> func();</span></span>
<span class="line"><span style="color:#24292e;"> l.unlock();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>虽然func函数是非线程安全的，但是我们在调用该函数前加了一把锁进行保护，那么这时funcA函数就是线程安全的了，其本质就是我们用一把锁间接的保护了全局变量。 </p><p>再看这样一段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">int func(int *num) {</span></span>
<span class="line"><span style="color:#e1e4e8;">   ++(*num);</span></span>
<span class="line"><span style="color:#e1e4e8;">   return *num;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">int func(int *num) {</span></span>
<span class="line"><span style="color:#24292e;">   ++(*num);</span></span>
<span class="line"><span style="color:#24292e;">   return *num;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>一般我们认为func函数是非线程安全的，因为我们不知道传入的指针是不是指向了一个全局变量，但如果调用func函数的代码是这样的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">void funcA() {</span></span>
<span class="line"><span style="color:#e1e4e8;"> int a = 100;</span></span>
<span class="line"><span style="color:#e1e4e8;"> func(&amp;a);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">void funcA() {</span></span>
<span class="line"><span style="color:#24292e;"> int a = 100;</span></span>
<span class="line"><span style="color:#24292e;"> func(&amp;a);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>那么这时funcA函数依然是线程安全的，因为传入的参数是线程私有的局部变量，无论多少线程调用funcA都不会干扰到其它线程。 </p><p>看了各种情况下的线程安全问题，最后让我们来总结一下实现线程安全代码都有哪些措施。</p><h3 id="如何实现线程安全" tabindex="-1"><strong>如何实现线程安全</strong> <a class="header-anchor" href="#如何实现线程安全" aria-label="Permalink to &quot;**如何实现线程安全**&amp;#x20;&quot;">​</a></h3><p>从上面各种情况的分析来看，实现线程安全无外乎围绕线程私有资源和线程共享资源这两点，你需要识别出哪些是线程私有，哪些是共享的，这是核心，然后对症下药就可以了。</p><ul><li><strong>不使用任何全局资源</strong>，只使用线程私有资源，这种通常被称为无状态代码 </li><li><strong>线程局部存储</strong>，如果要使用全局资源，是否可以声明为线程局部存储，因为这种变量虽然是全局的，但每个线程都有一个属于自己的副本，对其修改不会影响到其它线程 </li><li><strong>只读</strong>，如果必须使用全局资源，那么全局资源是否可以是只读的，多线程使用只读的全局资源不会有线程安全问题。 </li><li><strong>原子操作</strong>，原子操作是说其在执行过程中是不可能被其它线程打断的，像C++中的std::atomic修饰过的变量，对这类变量的操作无需传统的加锁保护，因为C++会确保在变量的修改过程中不会被打断。我们常说的各种无锁数据结构通常是在这类原子操作的基础上构建的 。 </li><li><strong>同步互斥</strong>，到这里也就确定了你必须要以某种形式使用全局资源，那么在这种情况下公共场所的秩序必须得到维护，那么怎么维护呢？通过同步或者互斥的方式，这是一大类问题，我们将在《深入理解操作系统》系列文章中详细阐述这一问题。</li></ul><h3 id="总结" tabindex="-1"><strong>总结</strong> <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;**总结**&quot;">​</a></h3><p>怎么样，想写出线程安全的还是不简单的吧，如果本文你只能记住一句话的话，那么我希望是这句，这也是本文的核心： </p><p>实现线程安全无外乎围绕线程私有资源和线程共享资源来进行，你需要识别出哪些是线程私有，哪些是共享的，然后对症下药就可以了。 </p><p>希望本文对大家编写多线程程序有帮助。</p>`,141),y=[h];function b(m,v,_,f,k,C){return n(),a("div",null,y)}const P=s(g,[["render",b]]);export{x as __pageData,P as default};