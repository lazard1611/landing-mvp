import hero from 'components/hero';
import projects from 'components/projects';
import logos from 'components/logos';
import team from 'components/team';
import ourServices from 'components/our-services';
import ourCapabilities from 'components/our-capabilities';
import ourManifesto from 'components/our-manifesto';
import gallery from 'components/gallery';
import awards from 'components/awards';
import faq from 'components/faq';
import footer from 'components/footer';

const index = () => {
	hero();
	projects();
	logos();
	team();
	ourServices();
	ourCapabilities();
	ourManifesto();
	gallery();
	awards();
	faq();
	footer();
};

export default index;
