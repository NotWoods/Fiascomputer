<script lang="ts">
	export let pairNumber: number;
</script>

<div id={`pair-${pairNumber}`} class="pair">
  <div class="item relationship" data-relationship>
    <h3 class="relationship-heading">Relationship</h3>
    <div class="category relationship-category">
      <button class="die relationship-category-die" title="Random!" />
      <a href="/relationship/category" class="name relationship-category-name"
        >Select Category</a
      >
      <button class="remove relationship-category-remove">
        <img src="/images/cross-black.svg" alt="Remove" />
      </button>
    </div>
    <div class="element relationship-element">
      <button class="die relationship-element-die" title="Random!" />
      <a href="/relationship/element" class="name relationship-element-name">Select Element</a
      >
      <button class="remove relationship-element-remove">
        <img src="/images/cross-black.svg" alt="Remove" />
      </button>
    </div>
  </div>
  <div class="item detail" data-detail>
    <div class="unspecified-detail">
      <button class="detail-control need-control">Need</button>
      <button class="detail-control location-control">Location</button>
      <button class="detail-control object-control">Object</button>
    </div>
    <div class="specified-detail">
      <div class="detail-type">
        <h3 class="detail-heading">Detail</h3>
        <button class="remove detail-remove">
          <img src="/images/cross-black.svg" alt="Remove" />
        </button>
      </div>
      <div class="category detail-category">
        <button class="die detail-category-die" title="Random!">5</button>
        <a href="/detail/category" class="name detail-category-name">Select Category</a>
        <button class="remove detail-category-remove">
          <img src="/images/cross-black.svg" alt="Remove" />
        </button>
      </div>
      <div class="element detail-element">
        <button class="die detail-element-die" title="Random!">5</button>
        <a href="/detail/element" class="name detail-element-name">Select Element</a>
        <button class="remove detail-element-remove">
          <img src="/images/cross-black.svg" alt="Remove" />
        </button>
      </div>
    </div>
  </div>
</div>
