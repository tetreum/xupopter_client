<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
	<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Xupopter</a>
	<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
	  <span class="navbar-toggler-icon"></span>
	</button>
	<div class="navbar-nav">
	  <div class="nav-item text-nowrap">
		<form method="POST" action="?/logout">
			<button class="btn nav-link px-3 btn-link" type="submit" name="logout" value="true">Sign out</button>
		</form>
	  </div>
	</div>
</header>
<div class="container-fluid">
	<div class="row">
	  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
		<div class="position-sticky pt-3">
		  <ul class="nav flex-column">
			<li class="nav-item">
			  <a class="nav-link active" aria-current="page" href="/app/">
				<i class="fa-solid fa-house"></i>
				Recipes
			  </a>
			</li>
			<li class="nav-item">
				<a class="nav-link" aria-current="page" href="/app/runners">
				<i class="fa-solid fa-robot"></i>
				  Runners
				</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" aria-current="page" href="/app/key">
				<i class="fa-solid fa-key"></i>
				  API
				</a>
			  </li>
		  </ul>
  
		  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted d-none">
			<span>Saved reports</span>
			<a class="link-secondary" href="#" aria-label="Add a new report">
			  <span data-feather="plus-circle"></span>
			</a>
		  </h6>
		  <ul class="nav flex-column mb-2 d-none">
			<li class="nav-item">
			  <a class="nav-link" href="#">
				<span data-feather="file-text"></span>
				Current month
			  </a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">
				<span data-feather="file-text"></span>
				Last quarter
			  </a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">
				<span data-feather="file-text"></span>
				Social engagement
			  </a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">
				<span data-feather="file-text"></span>
				Year-end sale
			  </a>
			</li>
		  </ul>
		</div>
	  </nav>
  
	  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
		<slot />
	</main>
	</div>
</div>
