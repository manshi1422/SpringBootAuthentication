package com.example.demo;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("hi");
	}
	@Bean
	public FilterRegistrationBean<PinggyAuthFilter> pinggyAuthFilterRegistration(PinggyAuthFilter filter) {
		FilterRegistrationBean<PinggyAuthFilter> registration = new FilterRegistrationBean<>(filter);
		registration.addUrlPatterns("/post", "/list");
		registration.setOrder(1);
		return registration;
	}
//	@Bean
//	public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
//		FilterRegistrationBean<CorsFilter> registration = new FilterRegistrationBean<>();
//		registration.setFilter(new CorsFilter());
//		registration.addUrlPatterns("/*");
//		registration.setOrder(Ordered.HIGHEST_PRECEDENCE);
//		return registration;
//	}
//@Bean
//public CorsFilter corsFilter() {
//	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	CorsConfiguration config = new CorsConfiguration();
//
//	config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//	config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//	config.setAllowedHeaders(Arrays.asList("authorization", "content-type", "pinggyauthheader"));
//	config.setAllowCredentials(true);
//
//	source.registerCorsConfiguration("/**", config);
//	return new CorsFilter();
//}
}
