import{_ as a,o as p,c as s,Q as t}from"./chunks/framework.bf97371d.js";const e="/assets/20_1.18ccb22b.jpg",o="/assets/20_2.78807950.jpg",r="/assets/20_3.293e2b02.jpg",n="/assets/20_4.ce0eeb6f.jpg",i="/assets/20_5.703f25d0.jpg",c="/assets/20_6.803806a7.jpg",h="/assets/20_7.4f7b4c85.jpg",l="/assets/20_8.b555b657.jpg",U=JSON.parse('{"title":"20.CPU核数与线程数有什么关系？","description":"","frontmatter":{},"headers":[],"relativePath":"20.cpu-he-shu-yu-xian-cheng-shu-you-shi-mo-guan-xi.md","filePath":"20.cpu-he-shu-yu-xian-cheng-shu-you-shi-mo-guan-xi.md"}'),d={name:"20.cpu-he-shu-yu-xian-cheng-shu-you-shi-mo-guan-xi.md"},u=t('<h1 id="_20-cpu核数与线程数有什么关系" tabindex="-1">20.CPU核数与线程数有什么关系？ <a class="header-anchor" href="#_20-cpu核数与线程数有什么关系" aria-label="Permalink to &quot;20.CPU核数与线程数有什么关系？&quot;">​</a></h1><p>作为一名美食资浅爱好者，尽管小风哥我厨艺拙计，但依然阻挡不了我对烹饪的热爱。 </p><p>那小风哥我通常是怎么做菜的呢？ </p><h2 id="大厨与菜谱" tabindex="-1">大厨与菜谱 <a class="header-anchor" href="#大厨与菜谱" aria-label="Permalink to &quot;大厨与菜谱&amp;#x20;&quot;">​</a></h2><p>你没猜错，做菜之前先去下一份菜谱，照着菜谱一步步来：起锅烧油、葱姜蒜末下锅爆香、倒入切好的食材、大火翻炒、加入适量酱油、加入适量盐、继续翻炒、出锅喽！</p><p><img src="'+e+'" alt=""></p><p>这样一道色香味俱佳的小炒大功告成，装盘端出来拿起筷子一尝，难吃死了。 </p><p>火候有点过，酱油加的有点少，盐加多了，中餐里的“火候”以及“适量”是最为神秘的存在，可以意会 不可言传。因此相对肯德基麦当劳之类的标准工业品，中餐更像是艺术。每个人炒出来的菜味道都不 一样，显然嘛，每个人对火候以及适量的理解是不一样的。 </p><p>对不起，跑题了。</p><p>虽然小风哥我厨艺不怎么样，但输厨艺不能输气场，有时我会几样一起来，这边炒着A菜，那边炒着B菜。 </p><p>也就是说，我可以同时按照两份菜谱去做饭，如果小风哥足够快，那么我可以同时炒 N 样菜。 </p><h2 id="炒菜与线程" tabindex="-1">炒菜与线程 <a class="header-anchor" href="#炒菜与线程" aria-label="Permalink to &quot;炒菜与线程&quot;">​</a></h2><p>实际上CPU和厨师一样，都是按照菜谱(机器指令)去执行某个动作，<strong>从操作系统的角度讲当CPU切换回用户态后，CPU执行的一段指令就是线程，或者说属于某个线程</strong>。</p><p><img src="'+o+'" alt=""></p><p>这和炒菜一样，我可以按照菜谱抄鱼香肉丝，那么炒菜时这就是鱼香肉丝线程；我可以按照菜谱抄宫保鸡丁，那么炒菜时这就是宫保鸡丁线程。 </p><p>厨师个数就好比CPU核心数，炒菜的样数就好比线程数，这时我问你，你觉得厨师的个数和可以同时抄几样菜有关系吗？ </p><p>答案当然是没有。 </p><p><strong>CPU的核心数和线程个数没有什么必然的关系</strong>。 </p><p>单个核心上可以跑任意多个线程，只要你的内存够就行；计算机系统内也可以有任意多核数，只要你有钱就行。 </p><p>看到这个答案你是不是觉得有点疑惑、有点疑问、有点不明所以，这好像和其它人说的不一样啊！ </p><p>别着急，我们慢慢讲。</p><h2 id="傻傻的cpu" tabindex="-1">傻傻的CPU <a class="header-anchor" href="#傻傻的cpu" aria-label="Permalink to &quot;傻傻的CPU&amp;#x20;&quot;">​</a></h2><p>CPU根本不理解自己执行的指令属于哪个线程，CPU也不需要理解这些，<strong>CPU需要做的事情就是根据PC寄存器中的地址从内存中取出后执行，其它没了</strong>。</p><p><img src="'+r+'" alt=""></p><p>你看CPU才不管你系统内有多少线程。 </p><p>有多少线程是谁需要来关心的呢？是操作系统。 </p><p>线程是操作系统的把戏。</p><h2 id="操作系统与多任务" tabindex="-1">操作系统与多任务 <a class="header-anchor" href="#操作系统与多任务" aria-label="Permalink to &quot;操作系统与多任务&amp;#x20;&quot;">​</a></h2><p>很久很久以前，计算机一次只能执行一个任务，你不能像现在这样在计算机上一边看电影一边在下小电影，哦，不对，一边写代码，一边下载资料。 </p><p>要么你先写代码，写完代码后再去下资料，要么你先下资料然后再写代码，总之，<strong>这两个任务不能同时进行</strong>。 </p><p>这显然很不方便，就这样，多任务——Multi-Tasking，诞生了。</p><p><img src="'+n+'" alt=""></p><p><strong>你CPU不是只知道执行机器指令吗？很好，那我操作系统就通过修改你的PC寄存器，让你CPU执行A任务的机器指令一段时间，然后下一段时间再去执行B任务的机器指令，再然后下一个时间段去执行C任务的机器指令</strong>，由于每一段时间非常少，通常在毫秒级别，那么在人类看来A、B、C三个任务在“同时”运行。 </p><p>这就是多任务的本质。 </p><h2 id="进程与线程" tabindex="-1">进程与线程 <a class="header-anchor" href="#进程与线程" aria-label="Permalink to &quot;进程与线程&amp;#x20;&quot;">​</a></h2><p>CPU不知道执行的某一段机器指令属于A任务还是B任务，只有操作系统知道，同时操作系统还能知道任务A和B任务是否属于同一个<strong>地址空间</strong>。 </p><p>如果属于同一个地址空间，那么任务A和任务B就是我们熟悉的“多线程”；如果不属于同一个地址空间，那么任务A和任务B就是我们熟悉的“多进程”，现在你应该明白这两个概念了吧。</p><p><img src="'+i+'" alt=""></p><p>这里出现了一个有点拗口的名词，地址空间，Address Space，关于地址空间的概念以及进程线程这一部分更加详细的讲解，请参考小风哥的《深入理解操作系统》第7章，关注公众号&quot;码农的荒岛求生&quot;并回复”操作系统“即可。 </p><p>值得注意的是，计算机系统还在单核时代就已经有多线程的概念了，我们之前说过，即使是单核也可以执行多个线程，那么有的同学可能会有疑问，在单核的系统中开启多个线程有什么意义吗？ </p><h2 id="单核与多线程" tabindex="-1">单核与多线程 <a class="header-anchor" href="#单核与多线程" aria-label="Permalink to &quot;单核与多线程&amp;#x20;&quot;">​</a></h2><p>假设现在有两个任务，任务A和任务B，每个任务需要的计算时间都是5分钟，那么无论是任务A和任务B串行执行还是放到两个线程中并行执行，在单核环境下执行完这两个任务总需要10分钟，因此有的同学觉得单核下多线程没什么用。</p><p>实际上，<strong>线程这个概念为程序员提供了一种编程抽象</strong>，我们可以把一项任务进行划分，然后把每一个子任务放到一个个线程中去运行。</p><p><img src="'+c+'" alt=""></p><p>假如你的程序带有图形界面，某个UI元素背后需要的大量运算，这时为了防止执行该运算时UI产生卡顿，那么可以把这个运算任务放到一个单独的线程中去。 </p><p>因此如果你的目的是防止当前线程因执行某项操作而不得不等待，那么在这样的应用场景下，你根本就不需要关心系统内是单核还是多核以及有多少个核。 </p><h2 id="阻塞式i-o" tabindex="-1">阻塞式I/O <a class="header-anchor" href="#阻塞式i-o" aria-label="Permalink to &quot;阻塞式I/O&amp;#x20;&quot;">​</a></h2><p>这也是使用线程的经典场景。 </p><p>如果没有线程，那么执行阻塞式I/O时整个进程会被操作系统暂停，但如果你开启两个线程，其中一个线程被阻塞时另一个线程依然可以继续向前推进。 </p><p>这样的话你就不需要去使用反人类的异步IO了。 </p><p>当然，<strong>这一切的前提是你的场景不涉及高性能以及高并发</strong>，如果涉及的话那这就是另一个话题了，如果你想了解这一话题，关注公众号“码农的荒岛求生”并回复“高并发”即可。 </p><p>在这种简单的场景下，你创建线程时也不需要关心系统中是单核还是多核。 </p><h2 id="多核时代" tabindex="-1">多核时代 <a class="header-anchor" href="#多核时代" aria-label="Permalink to &quot;多核时代&quot;">​</a></h2><p>实际上，线程这个概念是从2003年左右才开始流行的，为什么？因为这一时期，多核时代到来了。</p><p><img src="'+h+'" alt=""></p><p>之所以产生多核，是因为单核的性能提升越来越困难了。 </p><p>尽管采用多进程也可以充分利用多核，但毕竟多进程编程是很繁琐的，这涉及复杂的进程间通信机制、进程间切换的较高性能损耗、进程间内存相互隔离带来的对内存消耗等。 </p><p>线程这个概念很好的解决了上述问题，开始成为多核时代的主角，要想充分利用多核资源，线程是程序员的首选工具。 </p><h2 id="真正的并行" tabindex="-1">真正的并行 <a class="header-anchor" href="#真正的并行" aria-label="Permalink to &quot;真正的并行&amp;#x20;&quot;">​</a></h2><p>有了多核后，运行在两个线程中的任务A和任务B实现了真正的并行。 </p><p>此前这样一句话广为引用，这句话是这么说的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">threads are for people who can&#39;t program state machines</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">threads are for people who can&#39;t program state machines</span></span></code></pre></div><p>“线程是为那些不懂状态机的人准备的”，这句话在单核时代有它的道理，因为在单核时代，所有的任务都不是在同时向前推进，而是“交错”前进，A前进一点，然后B前进一点，线程并不是实现这种“伪并行”唯一的方法，状态机也可以。</p><p><img src="'+l+'" alt=""></p><p>但在多核时代，这句话就不再适用了，对于大多数程序员来说多进程多线程几乎是充分利用多核资源的唯一方法。 </p><p>如果你的场景是想充分利用多核，那么这时你的确需要知道系统内有多少核数，<strong>一般来说你创建的线程数需要与核数保持线性关系</strong>。 </p><p>也就是说，如果你的核数翻倍，那么创建的线程数也要翻倍。 </p><p><strong>需要多少线程？</strong></p><p>值得注意的是，线程不是越多越好。 </p><p>如果你的线程是不涉及任何I/O、没有任何同步互斥之类的纯计算类型，那么每个核心一个线程通常是最佳选择。但通常来说，线程都需要一定的I/O，可能需要一定的同步互斥，那么这时<strong>适当</strong>增加线程可能会提高性能，但当线程数量到达一个临界值后性能开始下降，这时线程间切换的开销将显著增加。</p><p>这里之所以用适当这个词，是因为这很难去量化，<strong>只能用你实际的程序根据真正的场景进行测试才能得到这个值</strong>。 </p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&amp;#x20;&quot;">​</a></h2><p>线程数和CPU核心数可以没有任何关联，如果在使用线程时仅仅针对上述提到的几个简单场景，那么你根本不需要关心CPU是单核还是多核。 </p><p>但当你需要利用线程充分发挥多核威力时，通常情况下你创建的线程数与核数要保持一种线性关系，最佳系数通常需要测试才能得到。 </p><p>我是小风哥，希望这篇文章对大家理解多核以及多线程有所帮助。</p>',75),g=[u];function _(m,P,b,x,C,f){return p(),s("div",null,g)}const k=a(d,[["render",_]]);export{U as __pageData,k as default};